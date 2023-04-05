import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { trpcApiPath } from '../pages/trpc/trpcPath';
import type { AppRouter } from '../pages/trpc/api/[trpc]';

export const createTrpcClient = (serverUrl: string) => createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${serverUrl}${trpcApiPath}`,
    }),
  ],
});
