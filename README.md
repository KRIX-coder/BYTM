# BYTM — Trademark Search, Registration & Protection

A modern, responsive multi-page website for BYTM, a trademark search and brand protection service.

## Pages

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `process.html` — Process
- `contact.html` — Contact (WhatsApp-powered form)

## Features

- Fully responsive (desktop → mobile)
- Full-screen mobile nav with logo, links, WhatsApp CTA, social icons
- Floating WhatsApp button on every page
- Contact form that submits inquiries directly to WhatsApp
- Scroll-reveal animations, hero parallax, animated stat counters, FAQ accordion
- Brand-matched green gradient theme (from the BYTM logo)

## Run locally

```bash
node server.js
```

Then open <http://localhost:8080/>.

## Configuration

WhatsApp number is defined in [`js/script.js`](js/script.js) as `WHATSAPP_NUMBER`.

## Structure

```
.
├── index.html
├── about.html
├── services.html
├── process.html
├── contact.html
├── css/style.css
├── js/script.js
├── assets/logo.svg
└── server.js        # Tiny Node.js static file server
```
