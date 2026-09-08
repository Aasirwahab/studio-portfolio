# Atelier Nord · Creative Studio

Next.js 15 + Tailwind + Framer Motion site for a creative studio — split-panel
hero slider, iris page transition that opens from your click, hover-open
service cards, filterable work grid with a lightbox, testimonial carousel,
right-edge social rail with search, and a validated contact form. Lenis smooth
scrolling throughout. 5 pages, responsive, honours `prefers-reduced-motion`.

## Develop / customize

```bash
npm install
npm run dev        # http://localhost:4181
npm run build
npm start          # production server on :4181
```

This is a Next.js app and runs on any Node host — Vercel, Netlify, Railway,
Fly. There is no static `dist/`.

## Structure

```
atelier-nord/
├── app/
│   ├── page.tsx              # home
│   ├── features/             # studio
│   ├── product/              # work — filterable grid + featured slider
│   ├── testimonial/          # voices
│   ├── contact/              # form
│   ├── layout.tsx            # fonts, metadata, CDN preconnect
│   └── globals.css           # tokens, Lenis, reduced motion
├── components/
│   ├── layout/               # nav, footer, social rail, iris transition, search
│   ├── sections/             # every page section
│   └── ui/                   # image, lightbox, reveals, buttons
├── context/                  # layout + lightbox state
├── lib/
│   ├── site.ts               # name, nav, contact details
│   ├── content.ts            # services, projects, features, testimonials
│   ├── images.ts             # every photo, keyed by where it is used
│   ├── lummi-loader.ts       # next/image loader for the Lummi CDN
│   └── motion.ts             # shared easings and variants
└── tailwind.config.ts        # palette, fonts
```

## Customize

1. **Content** — `lib/site.ts` for the name and contact details, `lib/content.ts`
   for everything else. Change them and every page follows.
2. **Colours** — `tailwind.config.ts`. Three keys: `green` is the cobalt accent
   (the name is kept so utilities stay stable), `ink` the deep cobalt for type and
   dark surfaces, `sage` the butter used on cobalt. Mirror them in `app/globals.css`.
3. **Type** — Fraunces and Manrope via `next/font` in `app/layout.tsx`.
4. **Images** — Lummi photos, keyed in `lib/images.ts` and sized per slot by
   `lib/lummi-loader.ts`. **These are placeholders — replace them before
   production.** To use your own host, swap the loader or drop it and set
   `images.remotePatterns` in `next.config.mjs`.
5. **Logo** — `components/layout/Logo.tsx`. The mark is a logoipsum placeholder;
   replace the two paths.

## Notes

- The page transition (`components/layout/PageTransition.tsx`) opens from the
  point you click; its timings are named constants there and in
  `context/LayoutContext.tsx`.
- The contact form validates on the client and simulates a send — wire
  `submit()` in `components/sections/ContactForm.tsx` to your endpoint.
