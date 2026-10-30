# Feybound: A Dance of Shadows

Hugo code for the Dungeons & Dragons fantasy novel "Feybound: A Dance of Shadows" by Frédéric Potvin at [https://v1-feybound.pages.dev/en/](https://v1-feybound.pages.dev/en/).

## Build and deploy

Build the site with Hugo and preview it on Cloudflare Pages:

```sh
hugo --minify --noBuildLock --environment production
wrangler pages deploy --branch dev
```

After reviewing the preview, deploy to production with `wrangler pages deploy --branch main`. Wrangler uses the configured Cloudflare credentials. The `public/` directory contains generated output and is not committed.
