import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './trpc';
import { trpcApiPath } from './trpcPath';

export const createTrpcClient = (serverUrl: string) => createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${serverUrl}${trpcApiPath}`,
    }),
  ],
});
