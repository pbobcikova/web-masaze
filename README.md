# Masáže Chrudim – Eleventy template

Static-site template that follows the look of masazechrudim-obrovska.cz (the
Astra "Lotus Spa" starter template on Elementor): home page, eight procedure
pages, price list, contacts, cookies stub, 404, sitemap and robots.txt.
The only dependency is Eleventy 3 (Node 18+).

## Quick start

```bash
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build into _site/
```

## Design

All values live in the `:root` block at the top of `src/assets/css/main.css`.

- **Fonts:** Brygada 1918 for headings (h1 88px / 500, h2 48px / 600, h3 32px / 600
  at full width) and Inter for body text (16px). Loaded from Google Fonts in `base.njk`.
- **Palette** (from the site's Elementor globals): plum ink `#221b22`, mauve `#8d6f93`,
  soft mauve `#c8b5c9`, lavender `#ede6f3`, off-white `#f6f5f4`, line grey `#e2e1df`,
  warm grey `#7f7c76`.
  Two small accessibility tweaks: body text is `#6a675f` and the footer/consultation
  band is `#7c5f82` so that text on them reaches WCAG AA contrast.
- **Shapes:** square corners, buttons 12px / 600 uppercase with wide letter spacing.
- **Layout:** transparent header over a dark banner, a small uppercase label above
  each heading, numbered "01 / 02 / 03" blocks, dark procedures section, stats band
  on procedure pages, tinted contact box, mauve footer.

### Photos

The banners and panels use gradients until you add photos. Put files in
`src/assets/img/` and fill in the paths in `src/_data/site.json` → `images`
(for example `"hero": "/assets/img/hero.jpg"`). Keys: `hero`, `banner` (inner-page
titles), `about`, `procedure`, `stats`, `cta`. Certificate scans go into
`certificates.json` → `image`.

## Where to edit content

| What | File |
| --- | --- |
| Name, phone, e-mail, address, hours, SEO description, GTM id, image paths | `src/_data/site.json` |
| Home-page copy | `src/_data/home.json` |
| Price list | `src/_data/pricing.json` |
| Certificates and courses | `src/_data/certificates.json` |
| Numbers in the stats band (hidden when `value` is `null`) | `src/_data/stats.json` |
| One procedure page | `src/procedury/<slug>.md` |

### Adding a procedure

Create `src/procedury/<slug>.md`:

```md
---
title: Název masáže
navTitle: Kratší název do menu   # optional
order: 9                          # position in menu and home grid
summary: Jedna věta pro úvodní stránku.
lead: Úvodní odstavec stránky.
repeat: Doporučená frekvence.     # optional
benefits:
  - První přínos
contraindications:                # optional
  - Těhotenství
showOnHome: false                 # optional, hides it from the home grid
---
Volný text (Markdown).
```

It appears at `/<slug>/`, in the menu and in the footer automatically. The slugs of
the eight procedures match the original site, so existing URLs keep working.

## Before going live

- `trigger-points.md` and `masaz-lavovymi-kameny.md` contain placeholder text.
- `stats.json`: add real numbers for years of experience and clients (both are
  `null`, so those two items are hidden), and check the other two.
- `home.json` → `testimonials` holds a placeholder review. Replace it, or use `[]`.
- `src/cookies.njk` is a stub.
- Google Tag Manager is off (`gtmId` is empty). Add a cookie consent banner before enabling it.
- Google Fonts are loaded from Google's servers. For stricter GDPR setups, self-host
  Brygada 1918 and Inter (for example via `@fontsource`).

## Deploying

`_site/` is plain static HTML. Build command: `npm run build`, publish directory: `_site`
(Netlify, Cloudflare Pages, GitHub Pages or any web hosting).
