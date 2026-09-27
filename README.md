# IRON MAN TECH

### GeeksforGeeks BU Orientation Experience

A red-edition, scroll-driven 3D experience for the GeeksforGeeks student chapter
at Bennett University. Built around an animated Iron Man model, event details,
and a content setup that can be edited without digging through the page bundle.

---

## The Experience

- **3D hero** rendered with Three.js and WebGL.
- **Scroll-led motion** and stage transitions powered by GSAP.
- **Sound controls** with an audio cue for the desktop experience.
- **Event card** with a generated Google Calendar link.
- **Responsive layout** for desktop and mobile.
- **JSON-managed content** for copy, event data, links, brand assets, and perk tiles.

## Run Locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. This project uses port `5175` by default.

## Edit Page Content

Edit [`content.json`](content.json). It contains the page metadata, headings,
visible copy, event details, registration and social links, image/audio/model
paths, and footer content. [`content.schema.json`](content.schema.json) documents
the supported structure and provides editor validation.

### Change the perk tiles

Add, remove, or reorder objects in `perks.items`. Each item needs a unique `id`,
`title`, and `body`; `tag` is optional. The progress rail, numbering, and total
count are generated from the array, so no separate count needs updating.

```json
{
	"id": "workshops",
	"title": "Hands-on workshops",
	"body": "Build something with the chapter team."
}
```

## Build and Preview

```bash
npm run build
npm run preview
```

The production site is written to `dist/`.

## Deploy to Vercel

Import this GitHub repository into Vercel. Use the project root with the Vite
framework preset, build command `npm run build`, and output directory `dist`.
The site does not require environment variables.

## Formatting

```bash
npm run format
```

## Source Note

This is a readable, formatted working copy of a bundled JavaScript application.
No original source modules or source map were available, so minifier-shortened
identifiers and original component boundaries cannot be recovered exactly.
