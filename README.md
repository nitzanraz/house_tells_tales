# הבית מספר — house-stories.net

Website for **הבית מספר** ("The House Tells") — documenting family homes and turning their stories into a printed family book.

Moved from base44 to a plain static site (no build tools needed).

## Structure
- `public/index.html` — all page content (text, sections, gallery)
- `public/styles.css` — colours, fonts, layout (colours are variables at the top)
- `public/script.js` — menu, scroll animations, contact form
- `public/images/` — web-sized images used by the site
- `originals/` — original full-size images downloaded from base44 (backup, not published)
- `netlify.toml` — hosting settings for Netlify

## Hosting
Hosted on **Netlify**, connected to this GitHub repo. Every push to `main` publishes automatically.
Contact-form submissions are collected by **Netlify Forms** (Netlify dashboard → Forms) and emailed.

## Preview locally
```
cd public && python3 -m http.server 8765
```
Then open http://localhost:8765 (the contact form only works once deployed on Netlify).
