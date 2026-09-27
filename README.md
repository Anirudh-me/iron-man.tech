# IRON MAN TECH

### GeeksforGeeks BU Orientation Experience

An immersive, scroll-driven orientation site for the GeeksforGeeks student
chapter at Bennett University. The experience combines a 3D Iron Man model,
animated event sections, audio, and JSON-managed page content.

![Are You The Geek? title artwork](public/assets/title-haveron-red.webp)

<p align="center">
	<a href="https://github.com/Anirudh-me/iron-man.tech">Source repository</a>
	· Vite · React · Three.js · GSAP
</p>

---

## Contents

- [Experience](#experience)
- [Run locally](#run-locally)
- [Project map](#project-map)
- [How the code works](#how-the-code-works)
- [Edit content and tiles](#edit-content-and-tiles)
- [Build and preview](#build-and-preview)
- [Free hosting on Vercel](#free-hosting-on-vercel)
- [Troubleshooting](#troubleshooting)
- [Source note](#source-note)

## Experience

- **Interactive 3D hero:** Three.js loads and animates the Iron Man GLB model.
- **Scroll choreography:** GSAP and ScrollTrigger coordinate the section and
  model transitions as the visitor moves down the page.
- **Sound:** a user-controlled sound layer and an additional desktop audio cue.
- **Perk sequence:** a stage-based list whose count and progress rail come from
  JSON data.
- **Event details:** event time, venue, audience, and a generated Google
  Calendar link.
- **Responsive layout:** the desktop and mobile experiences use responsive
  layouts and motion settings.
- **Editable content:** common page text, event details, links, asset paths, and
  tile data live in one JSON file.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite. The npm script starts the dev server on
port `5175` by default. Stop it with `Ctrl+C`.

## Project map

| Path                   | Purpose                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| `index.html`           | HTML shell, first-paint styling, and document metadata bootstrap.             |
| `assets/index-red.js`  | Formatted application bundle and React component/render logic.               |
| `assets/index-red.css` | Site layout, animation styles, responsive rules, and font-face declarations. |
| `content.json`         | Editable page content, metadata, links, event information, and asset paths.  |
| `content.schema.json`  | JSON Schema for editor validation and the accepted content shape.            |
| `public/assets/`       | Fonts and title artwork served from the site root at `/assets/...`.          |
| `public/`              | Model, audio, logos, and favicon copied as static site files.                |
| `vite.config.js`       | Vite dev-server and production-build settings.                               |
| `vercel.json`          | Vercel install command, build command, and static output directory.          |
| `dist/`                | Generated production site; created by the build and excluded from Git.       |

## How the code works

### Startup and configuration

1. Vite serves `index.html` and the application entry at `assets/index-red.js`.
2. The JavaScript imports `content.json`, then applies the configured title,
   description, theme color, and favicon to the document.
3. The scene loader reads the Iron Man model path directly from `content.json`;
  no request rewriting or global `fetch`/`XMLHttpRequest` overrides are used.
4. The React app mounts into `#root` and renders the loader, experience, sound
   control, sections, and footer.

### Main render and motion flow

- **Loader and hero:** the loader reports model progress and waits for the
  visitor's Enter action. The hero component owns the opening section and its
  scroll cue.
- **3D scene:** Three.js renders the model and the procedural background. The
  scene reads the local model path from `content.json` through the HTML helper.
- **Scroll stages:** ScrollTrigger updates the model's configured pose between
  the hero, perks, event, registration, and footer stages. In the current code,
  the Audio3 cue starts on desktop when the `#event` stage enters, stops when
  the `#register` rotation ends, and stops immediately when scrolling back.
  These audio boundaries are coded in `SN()`; they are not JSON settings.
- **Perks:** each object in `perks.items` becomes one stage tile and one segment
  in the progress rail. The sequence uses the array length for its total and
  its scroll duration.
- **Event:** event fields populate the ticket. The calendar URL is assembled
  from the event's name, start/end time, venue, campus, and registration link.
- **Registration:** the countdown derives from `event.start`; when time is up,
  its message replaces the countdown cells. The registration button uses the
  URL in `links.registration`.
- **Footer:** logo data, about text, social link, copyright, and wordmark come
  from the shared JSON content.

### Main functions in the readable bundle

The source bundle was originally minified. These short function names are the
identifiers that remain in the readable output; they are implementation
details, not a stable public API.

| Function | Responsibility                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------ |
| `iP()`   | Root app component; initializes scrolling, stage animations, audio lifecycle, and page sections. |
| `aN()`   | Loading screen, model progress, and the Enter gate.                                              |
| `mN()`   | Hero section and scroll cue.                                                                     |
| `DN()`   | Perks sequence, tile rendering, pinning, and progress rail.                                      |
| `jN()`   | Event card and generated calendar action.                                                        |
| `WN()`   | Registration section and countdown.                                                              |
| `KN()`   | Footer and brand links.                                                                          |
| `SN()`   | ScrollTrigger setup for model poses and Audio3 stage boundaries.                                 |
| `BN()`   | WebGL pixel-arc background effect.                                                               |
| `OM()`   | Smooth-scroll engine setup and teardown.                                                         |
| `UN()`   | Countdown time calculation and unit labels.                                                      |

`iP()` assembles the page components. `SN()` separately observes scroll
progress and drives the model stage poses. The section components create their
own GSAP reveal animations; the React markup and `assets/index-red.css` provide
the structure and styling, while `content.json` supplies the editable values.

### Content flow at a glance

```text
content.json
	├─ meta and labels ───────────────> document and UI text
	├─ perks.items[] ─────────────────> tiles, numbers, progress rail, duration
	├─ event ─────────────────────────> event ticket and calendar URL
	├─ links ─────────────────────────> registration, calendar, social links
	└─ assets ────────────────────────> logos, title art, audio, 3D model
```

## Edit content and tiles

Edit [`content.json`](content.json). Its schema is linked at the top of the file
and described in [`content.schema.json`](content.schema.json). No build-time or
server environment variables are needed for the public site content.

| JSON section              | What it controls                                                      |
| ------------------------- | --------------------------------------------------------------------- |
| `meta`                    | Browser title, description, theme color, and favicon.                 |
| `assets`                  | Title artwork, audio, 3D model, and logo paths/alt text/dimensions.   |
| `loader`, `sound`, `hero` | Loader labels, sound-control text, hero heading, and scroll cue.      |
| `links`                   | Registration, Linktree, and Google Calendar base URL.                 |
| `perks`                   | Perks section heading, intro, and variable-length `items` tile array. |
| `event`                   | Event dates/times, venue, audience, detail labels, and calendar text. |
| `registration`            | Registration heading/copy/button and countdown labels.                |
| `footer`                  | About text, link labels, copyright, and wordmark.                     |

### Change the number of perk tiles

Add, remove, or reorder entries in `perks.items`. Each entry requires a unique
`id`, `title`, and `body`. The `tag` field is optional. The component maps this
one array to both the tiles and progress rail, so the total count, numbering,
and sequence length update automatically.

```json
{
  "id": "workshops",
  "title": "Hands-on workshops",
  "body": "Build something with the chapter team.",
  "tag": "New"
}
```

Keep each `id` unique; React uses it to identify the tile and rail segment.

### Update event details or links

Change the matching values under `event` or `links`. The calendar link is
generated from `event.name`, `event.start`, `event.end`, `event.venue`,
`event.campus`, `event.calendarDescription`, and `links.registration`.
`event.start` and `event.end` should remain ISO-8601 date-time values with an
explicit timezone offset.

### Change local assets

Update a path under `assets` in the JSON and put the file at the corresponding
location in `public/`. For example, `/iron_man.glb` maps to
`public/iron_man.glb`. Keep the leading `/` for site-root public asset paths.
The page is public, so do not put passwords, API keys, or private data in
`content.json`.

## Build and preview

```bash
npm run build
npm run preview
```

The production site is written to `dist/`. `npm run format` runs Prettier over
the app bundle, stylesheet, JSON, Vite config, package file, and this README.

`vercel.json` tells Vercel to install with npm, run `npm run build`, and publish
`dist/`. No server-side runtime or environment variables are required.

## Free hosting on Vercel

This is a static Vite site and needs no server functions or environment
variables. Vercel Hobby is free for personal, non-commercial projects; check
Vercel's current plan terms if the site is being used commercially or on behalf
of an organization.

1. Sign in to Vercel with the GitHub account that owns the repository.
2. Choose **Add New → Project** and import
   [`Anirudh-me/iron-man.tech`](https://github.com/Anirudh-me/iron-man.tech).
3. Keep the project root at `.`. Vercel reads the install, build, and output
   settings from the committed `vercel.json` file.
4. Deploy. Vercel will create a preview/production URL and rebuild when you
   push updates to `main`.
5. In the Vercel project, open **Settings → Domains** and add `iron-man.tech`.
   Add `www.iron-man.tech` too if you want that hostname.
6. At your domain registrar, add the DNS records Vercel shows for each hostname.
   Follow the values shown in your Vercel dashboard rather than copying old
   example IPs. Keep existing MX records if you use email on the domain.
7. Wait for Vercel to verify the DNS records and issue HTTPS, then open
   `https://iron-man.tech`.

The domain name itself is registered separately; free hosting does not include
the domain registration or renewal fee.

## Troubleshooting

- **Model does not load:** confirm `content.assets.model` points to an existing
  file in `public/`, and that `index.html` is still loaded from the site root.
- **Fonts or images are missing:** check their `/assets/...` paths in CSS and
  confirm the matching files remain in `public/assets/`.
- **Changes do not appear on Vercel:** confirm the update was pushed to the
  connected branch and inspect the latest deployment's build log.
- **Custom domain stays pending:** compare the registrar's DNS records with the
  exact records shown under Vercel **Settings → Domains**.

## Source note

This is a readable, formatted working copy of a bundled JavaScript
application. The original source modules and source map were not available, so
the formatted bundle retains some short identifiers and does not reproduce
the original component boundaries exactly.
