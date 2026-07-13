# Updating 9 BAR content

You do not need an admin portal for small updates. Change the files below, commit, and Vercel will redeploy automatically.

## Business details and links

Update `lib/site.ts` for the WhatsApp number, phone number, Instagram handle, delivery area, business hours, and Foodpanda link.

Foodpanda is intentionally hidden until you have your store URL. When it is ready, set `NEXT_PUBLIC_FOODPANDA_URL` in Vercel to the exact restaurant page URL, then redeploy.


## Menu, prices, and descriptions

Update `lib/menu.ts`. Each menu drink is a single `item(...)` line: name, price, description, image path, and category are all there.

## Replacing a drink image

1. Drag your image into `public/images/coffee/` in VS Code.
2. Copy its path, for example `/images/coffee/iced-spanish-latte.jpg`.
3. Paste that path into the matching entry in `lib/menu.ts`.
4. Commit and push. Vercel will publish it automatically.

For best card quality, use a portrait or square JPG/WebP at least 1200px wide. Keep file names lowercase and use hyphens.

## Current brand files

- `public/images/brand/9bar-brand-art.png` — supplied logo artwork
- `public/images/brand/9bar-menu-card.jpeg` — supplied menu card artwork
