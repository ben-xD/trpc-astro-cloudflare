# tRPC, Astro and Cloudflare Pages Template

Modified from the basics template (`npm create astro@latest -- --template basics`) to add [tRPC](https://trpc.io/), [tRPC-panel](https://github.com/iway1/trpc-panel), running on Cloudflare Pages.

## Example:
- Website: https://trpc-astro-cloudflare.pages.dev/
- tRPC-panel: https://trpc-astro-cloudflare.pages.dev/trpc

## Known issues
- Astro does not rebuild app on changes, so cloudflare doesn't know to restart the server and refresh the browser.
- The list of users does not update. You need to refresh the page.
- Jetbrains Webstorm IDE has buggy astro integration (even with plugin installed).
