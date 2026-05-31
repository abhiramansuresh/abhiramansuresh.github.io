# Portfolio Website — Code Audit & Refactor Spec
**For Codex** · May 2026  
Scope: Performance · Responsive Layout · Code Quality · Reliability

---

## Quick Context

Static site, no build tooling. Plain HTML/CSS/JS deployed via GitHub Pages. All changes must work when opened directly in a browser — no bundler, no Node runtime.

**Files that exist:**
| File | Lines | Role |
|---|---|---|
| `index.html` | ~260 | Single-page shell |
| `styles.css` | 2,676 | Monolithic stylesheet |
| `js/projects.js` | 795 | Data, rendering, routing, lightbox |
| `js/clicker.js` | 445 | Gamification / XP system |
| `js/audio.js` | 81 | Sound management |
| `js/theme.js` | 15 | Dark/light theme toggle |
| `profile-animation.js` | 88 | Profile image animation |
| `wave-animation.js` | 66 | Hero wave effect |
| `word-carousel.js` | 64 | Rotating word in hero |

---

## Priority Order

Work in this order to avoid layout regressions:

- **P0** — Fix broken responsive layout (overlapping breakpoints, missing tablet)
- **P0** — Fix theme flash on page load
- **P0** — Fix image overflow on mobile
- **P1** — Deduplicate CSS rules
- **P1** — Extract inline nav script to `js/nav.js`
- **P1** — Replace inline `onclick` with event delegation
- **P1** — Debounce `localStorage` writes
- **P1** — Add `loading="lazy"` to gallery images
- **P1** — Merge Google Fonts into one `@import`
- **P2** — Add CSS section headers
- **P2** — Remove unused variables and dead rules
- **P2** — Replace `pageYOffset` with `scrollY`
- **P2** — Guard `window.trackGalleryView` call
- **P3** — Add Open Graph meta tags
- **P3** — Fix YouTube Shorts regex

---

## P0 — Responsive Breakpoints

### The problem
There are three overlapping mobile breakpoints (`800px`, `768px`, `900px`) targeting the same elements with conflicting rules. There is no tablet layout between 800–1200px — the sidebar disappears but the container stays `flex row` with `gap: 4rem`, making intermediate widths look broken.

### What to do

**Remove all existing `@media` blocks** and replace with this two-breakpoint system:

```css
/* Add to :root */
--bp-tablet: 1024px;
--bp-mobile: 640px;
```

**Desktop (default, no media query needed):**
- Sidebar: `position: sticky`, `width: 200px`, `height: 100vh`
- `.container`: `max-width: 1200px`, `width: 80%`, `margin: 0 auto`, `display: flex`, `flex-direction: row`

**Tablet `@media (max-width: 1024px)`:**
```css
@media (max-width: 1024px) {
  .container {
    width: 92%;
    flex-direction: column;
  }
  .sidebar {
    display: none; /* hidden on tablet */
  }
  .main-content {
    margin-left: 0;
    width: 100%;
    padding: 2rem var(--grid-margin);
  }
  .menu-button {
    display: block; /* show hamburger */
  }
}
```

**Mobile `@media (max-width: 640px)`:**
```css
@media (max-width: 640px) {
  .container {
    width: 100%;
  }
  .sidebar {
    display: flex; /* restored as off-canvas drawer */
    position: fixed;
    transform: translateX(-100%);
    left: 0;
    width: 280px;
    background-color: var(--background-color);
    box-shadow: 2px 0 10px rgba(0,0,0,0.3);
    z-index: 999;
  }
  .sidebar.active {
    transform: translateX(0);
  }
  .main-content {
    margin-left: 0;
    width: 100%;
    padding: 1.5rem var(--grid-margin);
  }
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
```

> ⚠️ The `.menu-button` and overlay/drawer HTML already exists and works correctly. Only CSS needs to change.

---

## P0 — Fluid Spacing with `clamp()`

Replace the stepped `--grid-margin` (currently overridden in every `@media` block) with fluid values in `:root`:

```css
--grid-margin: clamp(16px, 5vw, 100px);
--vertical-alignment: clamp(60px, 10vh, 150px);
```

This eliminates the need for per-breakpoint margin overrides.

---

## P0 — Image Overflow on Mobile

### Thumbnails in `createProjectCard()` (js/projects.js)

Add `loading="lazy"` and ensure the CSS covers sizing:

```css
.project-thumbnail {
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.project-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

### Gallery images in `loadProjectDetails()` (js/projects.js)

Add `loading="lazy"` to the dynamically generated `<img>` tag:

```js
// Change this:
<img src="${imgSrc}" alt="${project.title} screenshot">

// To this:
<img src="${imgSrc}" alt="${project.title} screenshot" loading="lazy" width="800" height="600">
```

### Profile image in `index.html`

```html
<!-- Add width and height to prevent layout shift -->
<img src="assets/profile.jpg" alt="Profile" class="profile-image" width="150" height="150">
```

---

## P0 — Theme Flash of Unstyled Content (FOUC)

### The problem
`theme.js` is loaded at the bottom of `<body>`. If the user has a saved theme, the page briefly renders the default theme before the script runs.

### What to do

Add this inline snippet to `<head>`, **before** the `<link>` to `styles.css`:

```html
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  })();
</script>
```

Keep `js/theme.js` at the bottom of `<body>` for the toggle button wiring — only this tiny init snippet needs to be in `<head>`.

---

## P1 — CSS Deduplication

The following selectors are defined more than once. Keep the **later** declaration (it wins the cascade) and remove the earlier one:

| Selector | Action |
|---|---|
| `.profile { text-align ... }` | Remove first occurrence (~line 380); keep second (~line 420) |
| `.nav-section { display: flex ... }` | Remove first occurrence (~line 290); keep second (~line 310) |
| `.profile-squares { margin: ... }` | Merge into single rule |
| `@media (max-width: 1200px)` | Two separate blocks — merge into one |
| `@media (max-width: 768px)` sidebar rules | Conflicts with 800px block — remove entirely once new breakpoints are in place |

---

## P1 — Extract Inline Nav Script

The bottom of `index.html` contains ~70 lines of scroll and active-state logic inside a `<script>` tag.

**Create `js/nav.js`** and move that entire script block into it verbatim.

In `index.html`, replace the inline `<script>` block with:

```html
<script src="js/nav.js" defer></script>
```

---

## P1 — Replace Inline `onclick` with Event Delegation

### The problem
`loadProjectDetails()` in `projects.js` generates HTML strings with `onclick="openLightbox(0)"` and `onkeydown="..."` attributes. This is fragile and breaks CSP.

### What to do

**Step 1** — In `loadProjectDetails()`, remove all inline `onclick`/`onkeydown` attributes. Instead, add a `data-media-index` attribute:

```js
// Change:
<div class="media-item" ... onclick="openLightbox(${globalIndex})" onkeydown="...">

// To:
<div class="media-item" data-media-index="${globalIndex}" role="button" tabindex="0" aria-label="Open in lightbox">
```

**Step 2** — In the `DOMContentLoaded` block (or after `renderProjectView` populates the DOM), add a single delegated listener on `#main-content-area`:

```js
document.getElementById('main-content-area').addEventListener('click', function(e) {
  var item = e.target.closest('.media-item');
  if (!item) return;
  var index = parseInt(item.dataset.mediaIndex, 10);
  if (!isNaN(index)) openLightbox(index);
});

document.getElementById('main-content-area').addEventListener('keydown', function(e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  var item = e.target.closest('.media-item');
  if (!item) return;
  e.preventDefault();
  var index = parseInt(item.dataset.mediaIndex, 10);
  if (!isNaN(index)) openLightbox(index);
});
```

---

## P1 — Debounce `localStorage` Writes in `clicker.js`

### The problem
Every click calls multiple `localStorage.setItem()` calls synchronously, blocking the main thread on rapid clicks.

### What to do

Add a `scheduleSave()` function at the top of the `DOMContentLoaded` callback:

```js
var saveTimer;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(persistState, 300);
}

function persistState() {
  localStorage.setItem('portfolio_xp', state.xp);
  localStorage.setItem('portfolio_level', state.level);
  localStorage.setItem('portfolio_clicks', state.clicks);
  localStorage.setItem('portfolio_achievements', JSON.stringify(state.achievements));
  localStorage.setItem('portfolio_face_clicks', state.faceClicks);
  localStorage.setItem('portfolio_meltdowns', state.meltdowns);
  localStorage.setItem('portfolio_social_clicks', state.socialClicks);
  localStorage.setItem('portfolio_galleries', JSON.stringify(state.viewedGalleries));
}
```

Replace every `localStorage.setItem(...)` call in `clicker.js` with `scheduleSave()`.

---

## P1 — Merge Google Fonts Imports

Replace the four separate `@import` lines at the top of `styles.css`:

```css
/* REMOVE these: */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
```

Replace with a single combined import:

```css
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&family=Special+Elite&family=Special+Gothic+Expanded+One&family=Press+Start+2P&display=swap');
```

Also add to `index.html` `<head>` before the font import:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## P2 — CSS Section Headers

Add these comment headers at the appropriate locations in `styles.css`. Do not move any rules — just insert the headers:

```css
/* ==========================================================
   1. CUSTOM PROPERTIES & DESIGN TOKENS
   ========================================================== */

/* ==========================================================
   2. RESET & BASE
   ========================================================== */

/* ==========================================================
   3. LAYOUT — CONTAINER, SIDEBAR, MAIN CONTENT
   ========================================================== */

/* ==========================================================
   4. TYPOGRAPHY
   ========================================================== */

/* ==========================================================
   5. NAVIGATION
   ========================================================== */

/* ==========================================================
   6. PROFILE & ANIMATION
   ========================================================== */

/* ==========================================================
   7. PROJECT CARDS & GRID
   ========================================================== */

/* ==========================================================
   8. PROJECT DETAIL & LIGHTBOX
   ========================================================== */

/* ==========================================================
   9. GAMIFICATION / HUD
   ========================================================== */

/* ==========================================================
   10. RESPONSIVE BREAKPOINTS
   ========================================================== */
```

---

## P2 — Dead Code to Remove

**In `styles.css`:**
- `--accent-colors` and `--accent-colors-hover` — comma-delimited strings, no valid CSS consumer. Remove both.
- `--scroll-offset: 100px` — defined but never used in any scroll calculation. Remove or start using it.
- `.sidebar { left: 70px }` inside `@media (max-width: 1200px)` — sidebar is `position: sticky`, not `fixed`, so `left` has no effect. Remove that line.
- `margin-top: 100` (unitless) on `.contact-section` — invalid CSS. Fix to `margin-top: 100px` or remove.

**In `js/projects.js`:**
- Guard the `window.trackGalleryView` call — it's called but never defined, causing a silent failure:
  ```js
  // Change:
  if (window.trackGalleryView) window.trackGalleryView(currProjectId);
  
  // To:
  if (typeof window.trackGalleryView === 'function') window.trackGalleryView(currProjectId);
  ```

**In `js/nav.js` (after extraction):**
- Replace deprecated `window.pageYOffset` with `window.scrollY`:
  ```js
  // Change:
  if (pageYOffset >= sectionTop - sectionHeight / 3) {
  
  // To:
  if (window.scrollY >= sectionTop - sectionHeight / 3) {
  ```

---

## P3 — Open Graph Meta Tags

Add to `index.html` `<head>`:

```html
<meta property="og:title" content="Abhi Suresh — Designer">
<meta property="og:description" content="Senior Designer working across UX, AI systems, and interactive product design.">
<meta property="og:image" content="assets/profile.jpg">
<meta property="og:type" content="website">
```

---

## P3 — YouTube Shorts Regex Fix

The current regex in `getYouTubeEmbedUrl()` handles `/shorts/` but inconsistently. Test it against all URL formats used in the project data and ensure these all parse correctly:

- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/shorts/VIDEO_ID`
- `https://youtu.be/VIDEO_ID?si=TRACKING_PARAM`

A robust replacement regex:

```js
const pattern = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
```

---

## Files Changed Summary

| File | What changes | Do NOT touch |
|---|---|---|
| `index.html` | Add theme init snippet to `<head>`. Remove inline nav script. Add preconnect hints. Add OG tags. Add `width`/`height` to profile img. | Section IDs, class names, sidebar HTML structure, all `<script>` tags for existing files. |
| `styles.css` | Add section headers. Merge duplicate rules. Replace breakpoints with 1024/640 system. Add `clamp()` spacing. Fix image rules. Merge font import. Remove dead vars. | All colour values, font families, animation keyframes, all transitions, gradient backgrounds. Desktop visuals must be pixel-identical. |
| `js/projects.js` | Replace inline `onclick` with `data-media-index` + event delegation. Guard `trackGalleryView`. Fix YouTube regex. Add `loading="lazy"` to gallery imgs. | Project data array. All rendering output. Routing / `history.pushState` logic. |
| `js/clicker.js` | Add `scheduleSave()` debounce. Replace all `localStorage.setItem` calls with `scheduleSave()`. | All game logic, XP calculations, achievement checks, animation triggers. |
| `js/nav.js` *(new)* | Extract inline nav script from `index.html` verbatim. | N/A — new file. |

---

## Acceptance Checklist

Before submitting, verify:

**Visual (desktop 1440px)**
- [ ] Sidebar on left, main content on right — identical to original
- [ ] Hero text, word carousel, wave animation render correctly
- [ ] Project cards in grid, featured section prominent

**Responsive**
- [ ] At 1024px: sidebar hidden, hamburger visible, content full-width
- [ ] At 768px: single column, comfortable padding, no horizontal scroll
- [ ] At 375px (iPhone SE): no overflow, hamburger opens drawer correctly
- [ ] Gallery images don't overflow at any width

**Functionality**
- [ ] Project card click opens detail view with fade transition
- [ ] Lightbox opens; ←/→/Esc keyboard nav works
- [ ] About link and browser back button work
- [ ] Audio toggle works
- [ ] XP counter increments and persists on reload
- [ ] Konami code easter egg still works
- [ ] No theme flash on page load

**Code**
- [ ] No console errors or warnings
- [ ] No horizontal scroll at any viewport width
- [ ] Lighthouse performance score not decreased from baseline

---

## Out of Scope

- Changing any copy, project data, or content
- Redesigning any visual element on desktop
- Adding a build system, bundler, or TypeScript
- Compressing or converting image assets
- Adding new features or animations
- Modifying the audio system, wave animation, or konami code logic
