# Domain & hosting notes — house-stories.net

Everything about how **house-stories.net** is set up, so it's easy to pick up again later.
Last updated: 2026-11-14.

## How it fits together

```
house-stories.net  ──DNS (Base44 / Wix)──►  Netlify (project: house-tells-tales)  ◄──auto-deploy──  GitHub repo (main)
```

| Piece | Where | What it does |
|---|---|---|
| Website code | GitHub: https://github.com/nitzanraz/house_tells_tales (local copy: `~/house_story`) | Plain HTML in `public/`. Every push to `main` goes live automatically. |
| Hosting | Netlify project **house-tells-tales** | Serves the site, HTTPS certificate (Let's Encrypt, auto-renews), contact form (Netlify Forms). Free plan. |
| Domain registration + DNS | Base44 "Domains by Wix" | Domain is registered here. Paid until **Oct 21, 2029**. Only the DNS records point it to Netlify. |
| Old site (not used anymore) | Base44 app **הבית מספר** | The original Base44 version. Still exists at https://house-tells-tales.base44.app as a backup. |

## Links

### Netlify
- All projects: https://app.netlify.com/teams/raz-nitzan/projects
- Domain management (custom domain + HTTPS): https://app.netlify.com/projects/house-tells-tales/domain-management
- Deploys (history, rollback): https://app.netlify.com/projects/house-tells-tales/deploys
- Form submissions: https://app.netlify.com/projects/house-tells-tales/forms
- Netlify address of the site: https://house-tells-tales.netlify.app

### GitHub
- Repo: https://github.com/nitzanraz/house_tells_tales

### Base44
- Domain manager (registration, DNS records, transfer): https://billing.base44.com/manage-domains?domainName=house-stories.net
- DNS records page: https://billing.base44.com/manage-domains/house-stories.net/manage-dns
- Old Base44 app – editor: https://app.base44.com/apps/6a60d851bc0d6a0f7049a8fe/editor/preview
- Old Base44 app – Domains page: https://app.base44.com/apps/6a60d851bc0d6a0f7049a8fe/editor/workspace/domains
- Base44 pricing: https://base44.com/pricing

## Current DNS records (at Base44 / Wix)

| Type | Host | Value | Points to |
|---|---|---|---|
| A | `house-stories.net` | `75.2.60.5` | Netlify load balancer |
| CNAME | `www.house-stories.net` | `house-tells-tales.netlify.app` | Netlify project |
| NS | `house-stories.net` | `ns12.wixdns.net`, `ns13.wixdns.net` | Wix (not editable) |

Before the move (for reference / rollback to Base44): A → `216.24.57.1`, CNAME www → `base44.onrender.com`.

## What we did (2026-11-14)

1. Found the site was being served by Base44 (DNS at Wix, hosting on base44.onrender.com).
2. Netlify project **house-tells-tales** already existed, deploying this GitHub repo.
3. Added `house-stories.net` (+ `www`) as custom domain in Netlify.
4. Changed the two DNS records at Base44/Wix to point to Netlify (table above).
5. Netlify showed "DNS verification was successful". The HTTPS certificate was being issued (can take up to ~1 hour).
6. Side effect: the "Edit with Base44" badge on the Base44 copy was set to hidden.

### Still to do
- [ ] Confirm https://house-stories.net loads from Netlify with a valid HTTPS lock (check: `curl -sI https://house-stories.net | grep -i server` should say `Netlify`).
- [ ] Optional: in the Base44 app → Domains → "…" next to house-stories.net → **Unlink Domain** (our attempt didn't go through; not required since DNS no longer points to Base44).
- [ ] Ask Base44 support: *"If I downgrade/cancel my subscription, do I keep house-stories.net until its Oct 2029 renewal?"*
- [ ] Downgrade Base44 to the **Free** plan (account settings → plan/billing). Takes effect at the next billing cycle.
- [ ] Optional, after **Dec 20, 2026**: transfer the domain away from Base44 (domain manager → "…" → **Transfer away from Base44**) to Netlify / Cloudflare / Namecheap so nothing depends on Base44. It's locked until then (normal 60-day lock).

## How to manage things later

- **Change the website:** edit files in `public/` → commit → push to `main`. Netlify publishes in ~1 minute. Check under Netlify → Deploys.
- **Undo a bad change:** Netlify → Deploys → pick an older deploy → "Publish deploy".
- **Contact form messages:** Netlify → Forms.
- **HTTPS problems:** Netlify → Domain management → HTTPS → "Retry DNS verification".
- **DNS changes (e.g. adding email/MX records):** Base44 domain manager → Manage DNS records. Keep the A and www CNAME as they are or the site goes offline.
- **Domain renewal:** due Oct 21, 2029 at Base44/Wix (or wherever it's transferred to). Watch for the renewal email.
- **If the domain is transferred away from Base44:** recreate the same A + CNAME records at the new provider (or use Netlify DNS) *before* the transfer completes, so the site doesn't go down.
