import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const createTrpcClient = (serverUrl: string) => createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${serverUrl}/api/trpc`,
    }),
  ],
});
