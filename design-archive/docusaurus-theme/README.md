# Archived Docusaurus theme

This directory preserves the visual system used by the former Docusaurus site. It is reference material only and is not imported by the Mintlify runtime.

## Palette

| Role | Value |
|---|---|
| Page/background dark | `#18181a` |
| Surface/card dark | `#1f1f21` |
| Deep card/hover dark | `#111111` |
| Borders | `#363538` |
| Primary accent | `#825dff` |
| Body text | `#a0a0a0` |
| Strong text | `#d8d8d8` |
| Iframe focus outline | `#007acc` |

## Typography

The previous site applied `Niveau Grotesk` globally. Font files and the original `stylesheet.css` are preserved in `assets/fonts/`.

## Assets

- `assets/logos/pipeops-light.svg` — light-theme logo.
- `assets/logos/pipeops-dark.svg` — dark-theme logo.
- `assets/favicons/` — favicon and app-icon variants.
- `custom.css` — complete original custom stylesheet, including Docusaurus/Infima selectors.
- `components/` — swizzled navbar, footer, and sidebar component sources.
- `iframe-compatibility.js` — legacy Docusaurus iframe behavior, retained for reference only.

The original navbar also referenced a remote dark logo URL in `components/Navbar/Logo/index.js`; that reference is preserved in the archived source but should be replaced with a version-controlled asset before future reuse.

## Reuse notes

The selectors prefixed with `--ifm-`, `.navbar__`, `.theme-doc-`, `.menu__`, and `#__docusaurus` are Docusaurus/Infima-specific. Reusing the palette and font is straightforward; reusing the component CSS requires remapping those selectors to the target runtime.
