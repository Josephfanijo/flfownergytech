# FLOWNERGY GLOBAL LIMITED — Hostinger Deployment & Configuration Guide

**Official Company:** FLOWNERGY GLOBAL LIMITED  
**Official Domain:** `https://flownergytech.com`  
**Framework:** React + Vite (Static Client SPA with Apache/LiteSpeed rewrite support)  
**Build Command:** `npm run build`  
**Build Output Directory:** `dist`

---

## 1. Runtime & Architecture Requirements

This application is built as a high-performance, responsive Single-Page Application (SPA) using React 19, Vite, and Vanilla CSS. 
- **Hostinger Plan Compatibility:** Compatible with **ALL** Hostinger plans (Single Web Hosting, Premium Web Hosting, Business Web Hosting, Cloud Startup, or VPS).
- **Runtime:** Static files served via Apache or LiteSpeed Web Server. Node.js server daemon is **NOT** required on the live server, which ensures maximum speed, minimal RAM consumption, 99.9% uptime, and zero backend maintenance issues.
- **Routing Support:** The application includes a pre-configured `.htaccess` file inside `dist/` (and `public/.htaccess`) ensuring that direct URLs (e.g. `https://flownergytech.com/services/solar-energy`) route correctly to `index.html` without 404 errors.

---

## 2. Production Build Verification

To generate the production bundle locally:

```bash
npm run build
```

The output will be created inside the `dist/` directory:
- `dist/index.html` (Complete SEO meta tags, Google Fonts, Open Graph, and JSON-LD schema)
- `dist/.htaccess` (Hostinger LiteSpeed/Apache SPA rewrite and security headers)
- `dist/assets/` (Minified, hashed JavaScript and CSS bundles)
- `dist/images/` (Branded SVG logos and high-resolution service imagery)
- `dist/favicon.svg` (Branded SVG favicon)
- `dist/robots.txt` (Search crawler directives)
- `dist/sitemap.xml` (Full XML sitemap for Google Search Console)

---

## 3. Hostinger Deployment Instructions

### Method A: Hostinger File Manager (Quickest & Simplest)

1. Log in to your **Hostinger hPanel** (https://hpanel.hostinger.com).
2. Go to **Websites** and click **Manage** next to `flownergytech.com`.
3. Under **Files**, open **File Manager**.
4. Navigate to the `public_html` folder.
   > *Note: If there is a default `default.php` file inside `public_html`, delete it.*
5. Build the project locally with `npm run build`.
6. Compress the contents of the `dist` folder into a `.zip` file (make sure you zip the files *inside* `dist`, not the outer `dist` folder itself).
7. Upload the `.zip` file to `public_html` in File Manager and click **Extract**.
8. Ensure `.htaccess`, `index.html`, `sitemap.xml`, `robots.txt`, and the `assets` & `images` folders are now located directly under `public_html/`.

---

### Method B: Hostinger Git Deployment (Continuous Deployment)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In Hostinger hPanel, search for **Git** in the left sidebar under **Advanced**.
3. Create a New Git Repository:
   - **Repository URL:** `https://github.com/your-username/flownergy.git`
   - **Branch:** `main`
   - **Directory:** Leave as `/public_html`
4. If your plan supports Automated Build scripts:
   - **Build Command:** `npm install && npm run build`
5. If using standard Git deployment, push the pre-built `dist` assets or use GitHub Actions to push `dist/` to Hostinger via FTP/SSH.

---

## 4. Connecting Domain & DNS Records (`flownergytech.com`)

Ensure your domain points to Hostinger's nameservers or DNS A records:

### Option 1: Using Hostinger Nameservers (Recommended)
Set the nameservers at your domain registrar to:
- `ns1.dns-parking.com`
- `ns2.dns-parking.com`

### Option 2: Custom DNS Records
If the domain is managed outside Hostinger (e.g. Namecheap, GoDaddy):
- **A Record:** `@` -> `[Your Hostinger Server IP Address]` (found in hPanel Dashboard)
- **CNAME Record:** `www` -> `flownergytech.com`
- **TTL:** 14400 (or Automatic)

---

## 5. SSL / HTTPS Configuration

1. In Hostinger hPanel, navigate to **Security** -> **SSL**.
2. Select `flownergytech.com` and click **Install SSL**.
3. Hostinger installs a lifetime free Let's Encrypt SSL certificate.
4. Toggle **Force HTTPS** to ON.

---

## 6. Contact Form & WhatsApp Configuration

### WhatsApp Business Number
The application includes direct WhatsApp dispatch integration for quotation submissions and footer enquiries.
To update to the verified official business phone number:
1. Open `src/data/companyData.js`.
2. Update the `whatsappNumber` field:
   ```javascript
   whatsappNumber: "234XXXXXXXXXX", // Replace with official number with country code (no + sign or spaces)
   ```
3. Run `npm run build` and re-upload.

### Live Email Delivery Integration
The quotation form currently saves inquiries locally (`localStorage`) with a generated reference tracking number (e.g. `#FLW-2026-XXXX`) and provides a 1-click WhatsApp forward button.
To connect directly to external email dispatch:
- **Formspree:** Change form `action` or endpoint to `https://formspree.io/f/YOUR_FORM_ID`
- **EmailJS:** Add EmailJS SDK keys in `.env` (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`)

---

## 7. Verification Checklist

- [x] Official company name: FLOWNERGY GLOBAL LIMITED
- [x] Official domain: https://flownergytech.com
- [x] Approved brand colors: #324763, #E87A00, #FFFFFF, #F5F7F9, #5F7894
- [x] Exactly 5 primary navigation items: Home, About Us, Services, Projects, Contact Us
- [x] Request a Quote prominent header CTA button
- [x] About Us section navigation: Company Overview, Mission & Vision, Our Values
- [x] Services dropdown with All Services + 4 Dedicated Service Pages
- [x] Projects filterable portfolio with modal details
- [x] Contact page with quotation system & WhatsApp link
- [x] SEO meta tags, Google Fonts, Open Graph, Sitemap & Robots.txt
- [x] `.htaccess` configured for Hostinger Apache/LiteSpeed rewrite
- [x] Production build tested and verified (`npm run build`)
