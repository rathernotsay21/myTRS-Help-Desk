import os
import re
import shutil
import base64
import argparse
from pathlib import Path
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import requests
import html2text
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("migration.log"),
        logging.StreamHandler()
    ]
)

class ContentMigrator:
    def __init__(self, source_dir, target_dir, image_dir):
        self.source_dir = Path(source_dir)
        self.target_dir = Path(target_dir)
        self.image_dir = Path(image_dir)
        self.html_converter = html2text.HTML2Text()
        self.html_converter.ignore_links = False
        self.html_converter.ignore_images = False
        self.html_converter.body_width = 0  # Don't wrap lines
        self.html_converter.protect_links = True
        self.path_mapping = self._create_path_mapping()
        
        # Ensure image directory exists
        os.makedirs(self.image_dir, exist_ok=True)
        
        # Track missing images for documentation
        self.missing_images = []
        
    def _create_path_mapping(self):
        """Create mapping between HTML files and target MD files."""
        mapping = {}
        
        # Main section paths
        section_mapping = {
            "build-site-launch": "build_site_launch",
            "overview": "overview",
            "registration-management": "registration_management",
            "troubleshoot": "troubleshoot"
        }
        
        # Find all HTML files in the Google Sites backup
        html_files = list(self.source_dir.glob("**/sites.google.com/my-trs.com/trshelpdesk/**/*.html"))
        
        for html_file in html_files:
            # Skip index.html files and certain patterns
            if html_file.name == "index.html" or html_file.name == "POST.html":
                continue
            
            # Skip certain directories that aren't content
            if "/_https_/" in str(html_file):
                continue
            
            # Get relative path from trshelpdesk directory
            try:
                relative_path = html_file.relative_to(
                    self.source_dir / "sites.google.com" / "my-trs.com" / "trshelpdesk"
                )
            except ValueError:
                continue
            
            # Check if it's a section page
            if len(relative_path.parts) == 1 and relative_path.stem in section_mapping:
                continue
                
            # Handle subsection pages
            if len(relative_path.parts) >= 2:
                section = relative_path.parts[0]
                page_name = relative_path.stem
                
                # Skip if not in a known section
                if section not in section_mapping:
                    logging.warning(f"Unknown section: {section} for file {html_file}")
                    continue
                
                # Create target markdown filename
                target_section = section_mapping[section]
                target_filename = self._convert_to_snake_case(page_name) + ".md"
                target_path = self.target_dir / target_section / target_filename
                
                # Create directory if it doesn't exist
                os.makedirs(target_path.parent, exist_ok=True)
                
                # If file doesn't exist, create it with basic frontmatter
                if not target_path.exists():
                    logging.info(f"Creating new file: {target_path}")
                    with open(target_path, 'w', encoding='utf-8') as f:
                        f.write("---\nsidebar_position: 99\n---\n# " + page_name.replace("-", " ").title() + "\n")
                
                mapping[html_file] = target_path
        
        return mapping
    
    def _convert_to_snake_case(self, name):
        """Convert kebab-case to snake_case."""
        return name.replace('-', '_')
    
    def extract_main_content(self, html_file):
        """Extract the main content from an HTML file."""
        with open(html_file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
        # Find the main content element
        # Try multiple possible selectors for Google Sites content
        main_content = None
        
        # Try different ways to locate the main content
        for selector in [
            'div[role="main"]', 
            '.UtePc', 
            '.RjsPE', 
            '.tyJCtd', 
            '.hJDwNd-AhqUyc-uQSCkd',
            '.hJDwNd-AhqUyc-II5mzb',
            'main',
            'article'
        ]:
            main_content = soup.select_one(selector)
            if main_content:
                break
        
        if not main_content:
            # Try to find the content by looking for substantial text blocks
            for div in soup.find_all('div'):
                if div.text and len(div.text.strip()) > 500:  # Look for substantial text
                    main_content = div
                    break
        
        if not main_content:
            # If we still can't find content, use the body
            main_content = soup.select_one('body')
            
        if not main_content:
            logging.error(f"Could not find main content in {html_file}")
            return "", ""
            
        # Extract the title
        title_elem = soup.select_one('title')
        title = ""
        if title_elem:
            title_parts = title_elem.text.split(' - ')
            if len(title_parts) > 1:
                title = title_parts[-1]
            else:
                title = title_elem.text
        
        # Look for a heading if title is empty or generic
        if not title or title == "Help Desk":
            h1 = main_content.select_one('h1')
            if h1:
                title = h1.text.strip()
            else:
                h2 = main_content.select_one('h2')
                if h2:
                    title = h2.text.strip()
        
        # Return both the title and content HTML
        return title, str(main_content)
    
    def process_images_in_content(self, content, base_url, html_file):
        """Process images in HTML content, create placeholders and note original URLs."""
        soup = BeautifulSoup(content, 'html.parser')
        images = soup.find_all('img')
        
        # Get the document name for image referencing
        doc_name = html_file.stem
        
        for idx, img in enumerate(images):
            src = img.get('src', '')
            if not src:
                continue
            
            # Skip certain images (like Google's own UI elements)
            if any(pattern in src for pattern in ['googleusercontent.com/_/atari', 'ssl.gstatic.com/atari']):
                continue
                
            # Handle relative URLs
            if not src.startswith(('http://', 'https://', 'data:')):
                src = urljoin(base_url, src)
            
            # Generate a meaningful filename
            img_id = img.get('id', '')
            alt_text = img.get('alt', '')
            
            # Make sure we're working with strings
            img_id = str(img_id) if img_id else ""
            alt_text = str(alt_text) if alt_text else ""
            
            # Create a placeholder filename
            placeholder_name = f"{doc_name}_image_{idx+1}.png"
            
            # Track this image as missing
            self.missing_images.append({
                'doc': str(html_file),
                'src': src,
                'alt': alt_text,
                'placeholder': placeholder_name
            })
            
            # Replace image with placeholder note
            new_node = soup.new_tag('p')
            new_node.string = f"[IMAGE: {alt_text or 'Screenshot'} - Original URL: {src}]"
            img.replace_with(new_node)
            
            logging.info(f"Created placeholder for image: {src}")
        
        return str(soup)
    
    def _sanitize_filename(self, name):
        """Create a safe filename from text."""
        # Convert to string if not already a string
        name = str(name)
        # Replace non-alphanumeric characters
        name = re.sub(r'[^\w\s-]', '', name.lower())
        # Replace whitespace with underscores
        name = re.sub(r'[\s]+', '_', name)
        # Limit length
        return name[:50]
    
    def convert_html_to_markdown(self, html_content):
        """Convert HTML content to Markdown."""
        return self.html_converter.handle(html_content)
    
    def extract_frontmatter(self, md_file):
        """Extract frontmatter from existing markdown file."""
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
        if frontmatter_match:
            return frontmatter_match.group(0)
        return "---\nsidebar_position: 99\n---"
    
    def migrate_content(self):
        """Migrate content from HTML files to Markdown files."""
        for html_file, md_file in self.path_mapping.items():
            try:
                logging.info(f"Processing: {html_file} -> {md_file}")
                
                # Extract title and content
                title, html_content = self.extract_main_content(html_file)
                
                # Process images - create placeholders instead of trying to download
                base_url = f"file://{html_file.parent}/"
                processed_html = self.process_images_in_content(html_content, base_url, html_file)
                
                # Convert to Markdown
                markdown_content = self.convert_html_to_markdown(processed_html)
                
                # Clean up the markdown
                markdown_content = self.clean_markdown(markdown_content)
                
                # Get existing frontmatter
                frontmatter = self.extract_frontmatter(md_file)
                
                # Combine and write to target file
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(frontmatter + "\n\n")
                    # Add title if not already present in the markdown
                    if title and not markdown_content.strip().startswith("# "):
                        f.write(f"# {title}\n\n")
                    f.write(markdown_content)
                
                logging.info(f"Successfully migrated: {html_file} -> {md_file}")
            
            except Exception as e:
                logging.error(f"Error migrating {html_file}: {e}")
        
        # Create a report of missing images
        self.create_image_report()
    
    def create_image_report(self):
        """Create a report of all missing images for reference."""
        if not self.missing_images:
            return
            
        with open("missing_images.txt", 'w', encoding='utf-8') as f:
            f.write("# Missing Images Report\n\n")
            f.write("This file lists all images that couldn't be downloaded automatically.\n")
            f.write("You'll need to manually capture these images from the original Google Site.\n\n")
            
            for img in self.missing_images:
                f.write(f"## Document: {img['doc']}\n")
                f.write(f"- Original URL: {img['src']}\n")
                f.write(f"- Alt Text: {img['alt']}\n")
                f.write(f"- Suggested filename: {img['placeholder']}\n\n")
    
    def clean_markdown(self, markdown):
        """Clean up the converted markdown for better formatting."""
        # Remove multiple consecutive empty lines
        markdown = re.sub(r'\n{3,}', '\n\n', markdown)
        
        # Fix heading levels (ensure proper hierarchy)
        lines = markdown.split('\n')
        cleaned_lines = []
        
        for i in range(len(lines)):
            # Check if line is a heading
            if lines[i].startswith('#'):
                # Count the number of # symbols
                level = len(re.match(r'^#+', lines[i]).group(0))
                
                # Ensure it's at most level 3 (###)
                if level > 3:
                    lines[i] = '###' + lines[i][level:]
            
            # Skip navigation links or UI elements
            skip_line = False
            for pattern in ['previous page', 'next page', 'home page', 'back to', 'footer', 'header', 'navigation', 'sidebar']:
                if pattern in lines[i].lower():
                    skip_line = True
                    break
                    
            if not skip_line:
                cleaned_lines.append(lines[i])
            
        # Join lines back together
        return '\n'.join(cleaned_lines)

def main():
    parser = argparse.ArgumentParser(description='Migrate content from Google Sites to Docusaurus')
    parser.add_argument('--source', required=True, help='Source directory with Google Sites backup')
    parser.add_argument('--target', required=True, help='Target Docusaurus docs directory')
    parser.add_argument('--images', default=None, help='Target directory for images (default: target_dir/../static/img/docs)')
    
    args = parser.parse_args()
    
    # Set default image directory if not provided
    if not args.images:
        args.images = os.path.join(os.path.dirname(args.target), 'static', 'img', 'docs')
    
    migrator = ContentMigrator(args.source, args.target, args.images)
    migrator.migrate_content()

if __name__ == "__main__":
    main()