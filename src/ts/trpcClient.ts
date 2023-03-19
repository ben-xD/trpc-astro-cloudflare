import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../pages/api/trpc/[trpc]';
 
export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // Warning: this probably needs to be updated when deployed. This only works in Cloudflare preview, since this URL
      // is the temporary local preview IP address.
      // Set this as an environment variable.
      url: 'http://127.0.0.1:8788/api/trpc',
    }),
  ],
});

// Completion works here:
const userId = trpcClient.createUser.mutate({name: , bio: });