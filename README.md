# Alina Khan — Celestial portfolio
React + Vite, custom Canvas celestial glyphs, individual star hover, three persistent themes, Fredoka bubble lettering, optional original synthesized chimes (off by default), and GitHub Pages deployment.

## Local development
Use Node.js 22 LTS or newer supported LTS.

```sh
npm install
npm run dev
```
Open the localhost address printed by Vite. `npm run build` builds `dist/`; `npm run preview` serves it locally.

## GitHub Pages
Push the source (not node_modules) to main. In repository Settings → Pages, select GitHub Actions as the source. The supplied workflow builds and deploys the site. Vite uses relative asset paths for project pages.

## Content
Edit src/main.jsx for profile, projects, articles and links. Research descriptions are provisional; publish only information approved for public disclosure. The four supplied Medium links are included, X and YouTube are absent. No copyrighted soundtrack is bundled. No remote fonts are loaded; system fonts are used.

V5: revised About profile; shadow-only letter hover; Contact navigation and interactive celestial smiley; four-article perspective carousel. Article summaries are title-based.

V6: full-viewport scroll sections (content can grow on smaller screens), site-wide moving starfield, Libre Caslon editorial typography, and a filled celestial face with hollow eyes and an inverted mouth. Fredoka remains for the interactive greeting/tagline. V13 replaces remote fonts with system font stacks.

### V8 update
All five chapter headings share the interactive celestial glyph canvas renderer with the homepage name. The navigation order is About, Research, Projects, Writings, Contact.

### V13
The mascot uses an inline SVG celestial pattern and CSS blinking and floating animations, without rotation. Runtime npm dependencies are React and React DOM only; Vite is the development/build tool. Canvas, SVG, CSS and Web Audio are native browser APIs. No external fonts or animation libraries are required. External profile and article links remain.

### V15
Updated About with software frameworks, AI research and the selected personal closing line. Existing interactions and dependencies are unchanged.

### V16
The About closing line has individual letter hover and touch-press animation. Compact screens use a touch-friendly two-column research/project/writing deck rather than overlapping rotating cards; desktop retains the rotating carousel. Reduced-motion settings disable decorative motion. Before publishing, run npm install, npm run build and npm run preview, then verify navigation, themes, cards and external links on desktop and real Android/iOS devices.
