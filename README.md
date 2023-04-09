# tRPC, Astro and Cloudflare Pages Template

Modified from the basics template (`npm create astro@latest -- --template basics`) to add [tRPC](https://trpc.io/), [tRPC-panel](https://github.com/iway1/trpc-panel), running on Cloudflare Pages.

## Example:
- Website: https://trpc-astro-cloudflare.pages.dev/
- tRPC-panel: https://trpc-astro-cloudflare.pages.dev/trpc

## Known issues
- The list of users does not update. You need to refresh the page.
- Jetbrains Webstorm IDE has buggy astro integration (even with plugin installed).

## Usage
- Run `pnpm prebuild` to generate the tRPC panel UI.
- Run `pnpm dev` to run dev server, and open the URL provided.

## Database migrations

- Create migration file: run `pnpm migration`
- Run on database: e.g. run `wrangler d1 execute DB --file migrations/0000_closed_harrier.sql --local`