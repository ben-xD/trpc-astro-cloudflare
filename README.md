# tRPC, Astro and Cloudflare Pages Template

Modified from the basics template (`npm create astro@latest -- --template basics`) to add [tRPC](https://trpc.io/), [tRPC-panel](https://github.com/iway1/trpc-panel), running on Cloudflare Pages.

## Known issues
- Astro does not rebuild app on changes, so cloudflare doesn't know to restart the server and refresh the browser.
- The list of users does not update. You need to refresh the page.
- Can't jump to API implementation from Astro files, even in VSCode.
- Jetbrains Webstorm IDE has buggy astro integration (even with plugin installed).
