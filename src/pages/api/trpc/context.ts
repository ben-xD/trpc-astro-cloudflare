import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

// Define binding to allow your worker to interact with Cloudflare D1.
export interface Env {
  DB: D1Database;
}

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const user = { name: req.headers.get('username') ?? 'anonymous' };
  return { req, resHeaders, user };
}
export type Context = inferAsyncReturnType<typeof createContext>;