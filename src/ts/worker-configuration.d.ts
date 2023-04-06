// Docs: https://www.npmjs.com/package/@cloudflare/workers-types
// Can be generated using `wrangler types` command.
export interface Env {
    MY_ENV_VAR: string;
    MY_SECRET: string;
    myKVNamespace: KVNamespace;
    DB: D1Database;
    SERVICE: Fetcher;
}
