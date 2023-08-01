# unsplash-top-image
Return URL of first result from unsplash.com search

## Setup

Create .dev.vars and input your Unsplash.com api key

```
UNSPLASH_ACCESS_KEY=your_access_key
```

Then push it to Cloudflare for deployment:

```
wrangler secret put UNSPLASH_ACCESS_KEY
```
