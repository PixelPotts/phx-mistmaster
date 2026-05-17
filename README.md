# PHX MistMaster Website

Professional misting system installation and repair — Phoenix, AZ.

## Structure

```
/random/phx-mistmaster/
├── index.html          Home page
├── services.html       Services detail
├── gallery.html        Photo gallery with filters + lightbox
├── booking.html        Calendar-based booking
├── quote.html          Multi-step quote form
├── about.html          About us
├── contact.html        Contact with map
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
    ├── logo.svg
    └── gallery/        Project photos (placeholders)
```

## Hosting

Static site — deploy to Netlify, Vercel, or any web host. No build step required.

## Forms

Forms submit to Formspree. Replace `your-form-id` in HTML with your actual Formspree endpoint.
