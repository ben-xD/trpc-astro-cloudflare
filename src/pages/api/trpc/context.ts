import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc';

// Define binding to allow your worker to interact with Cloudflare D1.
export interface Env {
  DB: D1Database;
}

export async function createContext({
  req,
  env
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) {
  const user = { name: req.headers.get('username') ?? 'anonymous' };

  return {
    db: env.DB,
    req,
    user
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;