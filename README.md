# Namor Wellness Spa — Next.js website

A responsive, motion-led single-page site for Namor Wellness Spa, Akosombo, Ghana. Built with Next.js App Router and deployed to the Webara Vercel team.

## Verified source details used
- Name: Namor Wellness Spa (from supplied social imagery)
- Location: Akosombo, Ghana
- Resort/location reference: Afrikiko River Front Resort (visible in supplied social profile)
- Instagram: `@namorwellnessspa` (`https://www.instagram.com/namorwellnessspa/`)
- WhatsApp/telephone: `+233 20 994 575` (provided by the owner; contact buttons open WhatsApp, with a direct call link in the visit section)
- Supplied image content: Volta lakeside sunset, robe/lakeside setting, massage, warm stones and tea

No opening hours, booking system, treatment menu/pricing, practitioner credentials or map coordinates were supplied. Confirm availability, treatment details and directions directly with the spa.

## Build & run
```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Motion & accessibility
The hero uses a slow background drift and staged entrance; a restrained ticker and IntersectionObserver section reveals support the story. A one-time-per-tab branded flash intro has a visible skip/enter action, Escape support, focus management, a replay control and `prefers-reduced-motion` handling. The floating, header and visit WhatsApp links work without an integrated booking backend; the page remains readable before JS enhancement.

## Image provenance
The repository includes only the clean editorial crops used by the page, under stable descriptive filenames. Original social screenshots used as references are intentionally excluded from this public source repository. Crops are used as visual references, not as proof of treatment outcomes.

## Enquiry delivery boundary
This is a brochure site, not an integrated booking or enquiry system. WhatsApp buttons open a conversation with the spa number supplied by the owner; the call link opens the phone dialler. Neither action submits an enquiry through the site or claims an appointment has been booked. Instagram remains available as an alternative contact route.

## Deployment
Vercel project: `webara1/namor-wellness-spa` (Next.js). Production alias: `https://namor-wellness-spa.vercel.app`. The Vercel Git integration is connected to this repository; pushes to `main` are intended to trigger production deployments, while other branches and pull requests can generate previews.
