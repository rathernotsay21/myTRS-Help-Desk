# myTRS-Help-Desk Project Overview

This document summarizes the project structure, design patterns, and best practices.
The document covers:

# Sections
Project Introduction - Brief overview of what the myTRS-Help-Desk is
Technology Stack - Framework and dependencies used
Project Structure - Detailed file and directory organization
Design Patterns & Architecture - Component structure and naming conventions
CSS Strategy - How CSS Modules and CSS variables are used
CSS Variables System - The design token approach for consistent styling
Documentation Structure - How the documentation is organized
Reusable Components - Key components and their purposes
Accessibility Features - Implemented accessibility improvements
Best Practices - Development standards for the project
Planned Improvements - Future enhancements from Stage 3
Development Workflow - Guidelines for continued development

This document will help both developers and LLMs understand the project's organization, design decisions, and established patterns. It serves as a quick orientation guide for anyone new to the codebase and provides context about the structural improvements we've implemented.


## Project Introduction

myTRS-Help-Desk is a documentation and support site built with Docusaurus for the myTRS volunteer management system. It provides users with documentation, guides, and resources for using the myTRS platform effectively.

## Technology Stack

- **Framework**: Docusaurus 3.7.0
- **JavaScript**: React 18.2.0
- **Styling**: CSS Modules + Custom CSS Variables
- **Documentation**: MDX format
- **Icons**: Font Awesome
- **Search**: Local search plugin (@easyops-cn/docusaurus-search-local)

## Project Structure

```
myTRS-Help-Desk/
├── blog/                     # Blog/news content
├── docs/                     # Documentation content in MDX
│   ├── build_site_launch/    # Site configuration docs
│   ├── overview/             # Platform overview docs
│   ├── registration_management/ # Registration management docs
│   ├── troubleshoot/         # Troubleshooting guides
│   └── intro.mdx             # Introduction page
├── scripts/                  # Utility scripts
├── src/
│   ├── components/           # React components
│   │   ├── Button/           # Reusable button component
│   │   ├── Card/             # Card component
│   │   ├── ChatBot/          # Chat support widget
│   │   ├── ClientCard/       # Client display cards
│   │   ├── ClientLogos/      # Client logo showcase
│   │   ├── DemoForm/         # Demo request form
│   │   ├── ErrorBoundary/    # Error handling component
│   │   ├── EventStatsCarousel/ # Event statistics display
│   │   ├── FAIcon/           # Font Awesome icon wrapper
│   │   ├── HomepageFeatures/ # Homepage feature section
│   │   ├── HomepageHeader/   # Homepage header section
│   │   ├── Icon/             # Generic icon component
│   │   ├── Image/            # Enhanced image component
│   │   ├── InfoCard/         # Information card component
│   │   ├── Section/          # Section layout component
│   │   ├── ServicesSection/  # Services showcase section
│   │   ├── SolutionBlock/    # Solution block component
│   │   └── SolutionGrid/     # Grid for solution blocks
│   ├── css/                  # Global CSS
│   │   └── custom.css        # Custom variables and styles
│   ├── pages/                # Standalone pages
│   │   ├── features/         # Feature pages
│   │   └── index.js          # Homepage
│   └── theme/                # Theme customizations
│       └── Layout/           # Custom layout wrapper
├── static/                   # Static assets (images, etc.)
├── docusaurus.config.js      # Docusaurus configuration
├── package.json              # Project dependencies
├── sidebars.js               # Sidebar navigation config
└── PROJECT-OVERVIEW.md       # This overview document
```

## Design Patterns & Architecture

### Component Architecture

Components follow a standardized structure:
```
ComponentName/
  ├── index.js              # Main component file
  └── styles.module.css     # Component-specific styles
```

### Naming Conventions

- **Components**: camelCase (e.g., `ClientCard`, `HomepageHeader`)
- **CSS Classes**: kebab-case (e.g., `form-field`, `button-primary`)
- **Documentation Files**: snake_case (e.g., `coding_standards.md`)

### CSS Strategy

- **CSS Modules**: Used for component-specific styles
- **CSS Variables**: Global design tokens defined in `custom.css`
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **Accessibility**: High-contrast support and proper focus states

## CSS Variables System

The project uses a comprehensive system of CSS variables for consistent styling:

```css
:root {
  /* Color palette */
  --ifm-color-primary: #0056b3;         /* Primary blue */
  --my-trs-accent: #d97706;             /* Accent color */
  
  /* Text colors */
  --my-trs-text: #2e2e2e;               /* Main text */
  --my-trs-text-light: #444444;         /* Secondary text */
  
  /* Spacing system */
  --my-trs-space-xs: 0.25rem;           /* 4px */
  --my-trs-space-sm: 0.5rem;            /* 8px */
  --my-trs-space-md: 1rem;              /* 16px */
  --my-trs-space-lg: 1.5rem;            /* 24px */
  --my-trs-space-xl: 2rem;              /* 32px */
  --my-trs-space-xxl: 3rem;             /* 48px */
  --my-trs-space-xxxl: 4rem;            /* 64px */
  
  /* Border radius */
  --my-trs-border-radius-sm: 4px;
  --my-trs-border-radius-md: 8px;
  --my-trs-border-radius-lg: 12px;
  
  /* Shadows */
  --my-trs-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --my-trs-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --my-trs-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

## Documentation Structure

Documentation is organized into the following categories:

1. **Introduction**: Getting started with myTRS
2. **Platform Overview**: Core concepts and navigation
3. **Registration Management**: Managing events and registrations
4. **Building Your Site**: Step-by-step site setup guides
5. **Troubleshooting**: Common issues and solutions

## Reusable Components

Key reusable components include:

- **Button**: Standardized button with multiple variants
- **Card**: Flexible card component for content display
- **Section**: Layout component for consistent section styling
- **Icon/FAIcon**: Icon components for consistent icon usage
- **Image**: Enhanced image component with lazy loading
- **ErrorBoundary**: Error handling for robust UI

## Accessibility Features

The project includes numerous accessibility improvements:

- **Skip Link**: For keyboard navigation
- **ARIA Attributes**: On interactive elements and forms
- **Focus States**: Visible focus indicators for keyboard users
- **Color Contrast**: Enhanced contrast ratios for text
- **Form Validation**: Accessible error messaging
- **High Contrast Mode**: Support for Windows high contrast mode

## Best Practices

1. **PropTypes**: All components include PropTypes validation
2. **CSS Modules**: Component-specific styles are isolated
3. **Responsive Design**: Mobile-first approach
4. **Error Handling**: Error boundaries for resilient UI
5. **Performance**: Lazy loading images and optimized assets
6. **Documentation**: Components include JSDoc comments

## Planned Improvements

Future improvements include:

1. **Performance Optimization**: Code splitting and bundle optimization
2. **Enhanced State Management**: Context API for global state
3. **Automated Testing**: Unit and integration tests
4. **Component Catalog**: Living style guide with Storybook
5. **CSS Optimization**: Audit and optimization of CSS rules

## Development Workflow

1. Follow the component structure and naming conventions
2. Use existing components when possible (don't reinvent)
3. Utilize CSS variables for consistency
4. Include PropTypes for all component props
5. Ensure accessibility in all new features
6. Document changes and additions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build
```

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
