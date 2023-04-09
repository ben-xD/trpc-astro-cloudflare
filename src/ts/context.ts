import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Env } from './worker-configuration';
import { getRuntime } from "@astrojs/cloudflare/runtime";
import { drizzle } from 'drizzle-orm/d1';

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  // Get cloudflare bindings, as per https://docs.astro.build/en/guides/integrations-guide/cloudflare/#access-to-the-cloudflare-runtime
  const runtime = getRuntime<Env>(req);
  // console.log({runtime});
  // Now use a binding, for example: `runtime.env.SERVICE.fetch()`
  // Alternatively, get an environment variable with: `import.meta.env.SERVER_URL`
  // You can read custom or pre-defined environmment variables with e.g. import.meta.env.MODE, .BASE_URL, .CUSTOM_VAR, etc. 

  const user = { name: req.headers.get('username') ?? 'anonymous' };
  const db = drizzle(runtime.env.DB);
  return { req, resHeaders, user, db };
}
export type Context = inferAsyncReturnType<typeof createContext>;
