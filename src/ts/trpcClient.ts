import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../pages/api/trpc/[trpc]';
 
export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // Warning: this probably needs to be updated when deployed. This only works in Cloudflare preview, since this URL
      // is the temporary local preview IP address.
      // Set this as an environment variable.
      // TODO avoid passing the hostname, just use the same hostname
      url: 'https://trpc-astro-cloudflare.pages.dev/api/trpc',
    }),
  ],
});
