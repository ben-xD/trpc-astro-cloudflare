import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '../../../ts/context.js';
import type { APIRoute } from 'astro';
import { trpcApiPath } from '../../../ts/trpcPath.js';
import { appRouter } from '../../../ts/trpc.js';

// Explicitly handle options requests separately, since tRPC will reject them.
export const options: APIRoute = async () => {
    const response = new Response(null, {status: 200, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}});
    return response
}

// The Astro API route, handling all incoming HTTP requests, except for options.
export const all: APIRoute = async ({ request }) => {
    const response = await fetchRequestHandler({
        req: request,
        endpoint: trpcApiPath,
        router: appRouter,
        createContext
    });
    response.headers.set('Access-Control-Allow-Origin', "*");
    response.headers.set("Access-Control-Allow-Headers", "*");
    return response
};

// Notes
// - Consider stricter cors.
// - Useful to read headers: 
// response.headers.forEach((value, key) => {
//     console.log(`Header (${key}: ${value})`);
// })
