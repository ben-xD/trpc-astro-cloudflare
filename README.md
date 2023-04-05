# tRPC, Astro and Cloudflare Worker Template

Modified from the basics template (`npm create astro@latest -- --template basics`).

## Known issues
- Astro does not rebuild app on changes, so cloudflare doesn't know to restart the server and refresh the browser.
- The list of users does not update. You need to refresh the page.
- Can't jump to API implementation from Astro files, even in VSCode.
- Jetbrains Webstorm IDE has buggy astro integration (even with plugin installed).
