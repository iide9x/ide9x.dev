# ide9x.dev

Personal security-research blog for **ide9x (DestroyerX / Ahmed)**.

## Security

This is a static site (no backend/database), so server-side attack classes
(SQLi, RCE, auth bypass, SSRF) don't apply. Hardening in place:

- **CSP + referrer policy** via `<meta>` in `src/app/layout.tsx`
- **Markdown is sanitized** — `remark-html` strips raw `<script>`, event handlers,
  and `javascript:` URLs, so blog content can't inject XSS
- **security.txt** at `/.well-known/security.txt`
- **No secrets in repo** — only public profile links

### Real HTTP headers (optional, recommended)

GitHub Pages can't set response headers. To add HSTS, X-Frame-Options,
X-Content-Type-Options and a header-based CSP, put the domain behind
**Cloudflare (free)**:

1. Add `ide9x.dev` to Cloudflare, switch name.com nameservers to Cloudflare's.
2. Enable "Always Use HTTPS" + HSTS.
3. Add a Transform Rule → HTTP Response Header Modification with:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: geolocation=(), microphone=(), camera=()`
