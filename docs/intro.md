---
sidebar_position: 1
---

# Markdown Guide for Docusaurus

This guide demonstrates the markdown features available in your Docusaurus documentation.

## Headings

Docusaurus supports six levels of headings:

# H1 - Main Title
## H2 - Section Title
### H3 - Subsection Title
#### H4 - Topic Title
##### H5 - Subtopic Title
###### H6 - Paragraph Title

## Text Formatting

**Bold text** is created with `**double asterisks**`

*Italic text* is created with `*single asterisks*`

***Bold and italic*** is created with `***triple asterisks***`

~~Strikethrough~~ is created with `~~double tildes~~`

## Lists

### Unordered Lists

* Item 1
* Item 2
* Nested item 2.1
* Nested item 2.2
* Item 3

### Ordered Lists

1. First item
2. Second item
1. Nested item 2.1
2. Nested item 2.2
3. Third item

### Task Lists

- [x] Completed task
- [ ] Incomplete task

## Code

### Inline Code

Use `inline code` by wrapping text with backticks.

### Code Blocks

```javascript
// JavaScript code block
function hello() {
  console.log('Hello, world!');
}
```

```python
# Python code block
def hello():
    print("Hello, world!")
```

## Links

### External Links

[Docusaurus Website](https://docusaurus.io/)

### Internal Links (Relative)

[Go to Dashboard Navigation](./overview/dashboard_navigation.md)

### Internal Links (with Path)

[Go to Dashboard Navigation](/docs/overview/dashboard_navigation)

### Anchor Links

[Go to Code section](#code)

## Images

![Docusaurus logo](https://docusaurus.io/img/docusaurus.png)

### Images with custom size

<img src="https://docusaurus.io/img/docusaurus.png" alt="Docusaurus logo" width="200"/>

## Blockquotes

> This is a blockquote.
>
> It can span multiple lines.

## Horizontal Rule

---

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
| Row 3, Col 1 | Row 3, Col 2 | Row 3, Col 3 |

## Admonitions

:::note
This is a note admonition.
:::

:::tip
This is a tip admonition.
:::

:::info
This is an info admonition.
:::

:::caution
This is a caution admonition.
:::

:::danger
This is a danger admonition.
:::

### Admonitions with Custom Titles

:::note Your Title
This is a note with a custom title.
:::

## Details/Disclosure

<details>
  <summary>Click to expand!</summary>
  <div>
    <div>This content is hidden by default.</div>
    <br/>
    <details>
      <summary>Nested disclosure!</summary>
      <div>Even more hidden content.</div>
    </details>
  </div>
</details>

## Front Matter

Docusaurus uses front matter in YAML format at the top of Markdown files for configuration:

```yaml
---
sidebar_position: 1
title: Custom Title
description: A description that will be used in the meta tags
image: /img/custom-image.png
keywords: [keyword1, keyword2]
---
```

## Custom ID Headers

### My Custom ID {#custom-id}

You can link to this section with [Link to Custom ID](#custom-id)

## Comments

<!-- This is a comment that won't be rendered -->
