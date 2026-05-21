# PHX MistMaster Website

Professional misting system installation and repair — Phoenix, AZ.

- **Live:** https://phxmistmaster.com
- **Pages:** https://phx-mistmaster.pages.dev

## Structure

```
phx-mistmaster/
├── index.html          Home page
├── services.html       Services detail
├── gallery.html        Photo gallery with filters + lightbox
├── booking.html        Calendar-based booking
├── quote.html          Multi-step quote form
├── about.html          About us
├── contact.html        Contact with map
├── wrangler.toml       Cloudflare Pages config
├── css/
│   ├── style.css       Main styles + variables
│   ├── components.css  Reusable components
│   └── responsive.css  Media queries
├── js/
│   ├── main.js         Nav, scroll, animations
│   ├── gallery.js      Filter + lightbox
│   ├── booking.js      Calendar widget
│   └── form.js         Multi-step form + validation
└── images/
    ├── hero-bg-2.png   Hero background
    └── gallery/        Project photos (placeholders)
```

## Hosting

Cloudflare Pages — static site, no build step.

```bash
wrangler pages deploy . --project-name phx-mistmaster
```

## Forms

Forms submit to Formspree. Replace `your-form-id` in contact.html, booking.html, quote.html, and js/form.js with your actual Formspree endpoint.
