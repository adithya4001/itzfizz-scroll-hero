# Itzfizz — Move with impact

[Live website](https://adithya4001.github.io/itzfizz-scroll-hero/) · [GitHub repository](https://github.com/adithya4001/itzfizz-scroll-hero)

A responsive scroll-driven hero for the Itzfizz Digital web development assignment. The car travels across a full-width track as the page scrolls, uncovering a lime trail and the message “Move with impact.” Reverse scrolling reverses the journey.

## Stack

React, JavaScript, HTML, CSS, Tailwind CSS, GSAP and ScrollTrigger. Vite generates the static production site.

## Run locally

Use Node.js 24 with npm.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Upload the contents of `dist` to any static web host. Relative asset URLs support GitHub Pages project paths without router configuration.

## GitHub Pages

Push this project to the `main` branch of a GitHub repository. In **Settings → Pages → Build and deployment**, select **GitHub Actions**. The included workflow installs the locked dependencies, builds the site, and publishes `dist`. After the workflow succeeds, its deployment output contains the live URL.

## Animation

- The letter-spaced headline enters with staggered opacity and vertical transforms.
- Four impact cards enter sequentially with subtle delays.
- A pinned hero connects car translation, track fill and the progress bar to scroll position.
- `scrub: 0.65` interpolates toward the current scroll position. The car has no autoplay or repeating timeline.
- Travel distance is measured at initialization and refresh, rather than every scroll event.
- GSAP media contexts adapt the scroll distance to mobile and revert animations during React cleanup.
- Reduced-motion preferences disable the intro, pinning and scroll animation while keeping the content visible.
- Native scrolling, anchor links, a keyboard-accessible skip link and visible focus indicators are retained.

## Design and assets

Inspired by the [provided car animation reference](https://paraschaturvedi.github.io/car-scroll-animation/). The illustrated SVG car and favicon are original project assets. No external images, web fonts, API keys or services are required at runtime. The four example percentages and descriptions follow the supplied reference; they are assignment content, not independently verified business claims.

Application source code contains no comments, as requested. Bundled dependencies may retain their required license notices.

## Submission

The assignment form requests the live webpage URL and GitHub repository URL, plus the applicant’s name, email and phone number. The Internshala message gives a submission deadline of **16 October 2026**.
