import { initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Context, createContext } from './context';
import { z } from 'zod';
import type { APIRoute } from 'astro';
type User = {
    id: string;
    name: string;
    bio?: string;
};

// This is lost between Cloudflare worker invocations.
const users: Record<string, User> = {};

// Inpsired by https://invertase.io/blog/astro-trpc-v10/ and https://trpc.io/docs/fetch
export const t = initTRPC.context<Context>().create();

const appRouter = t.router({
    getUserById: t.procedure.input(z.string()).query(({ input }) => {
        return users[input]; // input type is string
    }),
    createUser: t.procedure
        // validate input with Zod
        .input(
            z.object({
                name: z.string().min(3),
                bio: z.string().max(142).optional(),
            }),
        )
        .mutation(({ input }) => {
            const id = Date.now().toString();
            const user: User = { id, ...input };
            users[user.id] = user;
            return id;
        })
});

// The Astro API route, handling all incoming HTTP requests.
export const all: APIRoute = ({ request }) => {
    return fetchRequestHandler({
        req: request,
        endpoint: '/api/trpc',
        router: appRouter,
        createContext
    });
};

export type AppRouter = typeof appRouter;
