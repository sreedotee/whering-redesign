# Whering Design System (Modularity First)

This design system is extracted from the latest profile identity artboards (`2BS-0` and `2HT-1`). It focuses on a **Modern Editorial** aesthetic, combining high-craft Serif typography with clean, geometric Sans-serif functional elements.

## 1. Core Tokens

### Colors
| Token | Dark (Default) | Light | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#000000` | `#FFFFFF` | Main page backgrounds |
| `--bg-secondary` | `#0D0D0D` | `#F2F2F2` | Card backgrounds, search bars |
| `--fg-primary` | `#FAFAFA` | `#0D0D0D` | Primary text, titles |
| `--fg-secondary` | `#828282` | `#4F4F4F` | Captions, handles, inactive states |
| `--border-primary` | `#1A1A1A` | `#E0E0E0` | Dividers and borders |
| `--accent-blue` | `#3498DB` | `#3498DB` | High-visibility accents |
| `--accent-orange` | `#F39C12` | `#F39C12` | Social highlights/alerts |
| `--accent-white` | `#FFFFFF` | `#FFFFFF` | Universal highlight |

### Typography
- **Display (DM Serif Display)**: Used for identity-level headings (e.g., user names).
  - `size: 64px`, `line-height: 78px`, `weight: 400`
- **Heading (Outfit)**: Used for page headers and section titles.
  - `size: 36px`, `line-height: 44px`, `weight: 500`
- **Body (Outfit)**: Standard UI text.
  - `size: 18px`, `line-height: 24px`, `weight: 400`
- **Caption (Outfit)**: Secondary labels and metadata.
  - `size: 32px` (Large metadata), `size: 14px` (Standard caption)

### Spacing & Layout
- `container-padding`: `48px`
- `section-gap`: `48px`
- `element-gap`: `24px`
- `border-radius-pill`: `9999px`
- `border-radius-card`: `24px`

## 2. Component Primitives (CSS implementation in index.css)

### Pill Button
- **Background**: `--fg-primary`
- **Text**: `--bg-primary`
- **Radius**: `var(--radius-pill)`

### Nav Bar (System)
- **Position**: Bottom Fixed
- **Blur**: `blur(16px)`

---
*Note: This system is designed to be modular. Tweaking the tokens in `index.css` will propagate changes across all future screens and flows.*
