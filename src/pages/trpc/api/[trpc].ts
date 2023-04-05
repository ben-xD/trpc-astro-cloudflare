import { initTRPC } from '@trpc/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Context, createContext } from '../context';
import { z } from 'zod';
import type { APIRoute } from 'astro';
import { trpcApiPath } from '../trpcPath';
type User = {
    id: string;
    name: string;
    bio?: string;
};

// This has to match quite strongly to the schema. Considering using an ORM?
type UserDb = {
    UserID: string;
    name: string;
    bio?: string;
}

// Inpsired by https://invertase.io/blog/astro-trpc-v10/ and https://trpc.io/docs/fetch
export const t = initTRPC.context<Context>().create();

const appRouter = t.router({
    getUsers: t.procedure.query(async ({ctx}) => {
        try {
            // When running locally, it seems to use the wrong database. My local database has a Users table
            // See `wrangler d1 execute trpc-astro-cloudflare-template --command="SELECT name FROM sqlite_master WHERE type='table'" --local`.
            // However, error is 
            // {
            //     message: 'D1_ERROR',
            //     cause: 'Error: SqliteError: no such table: Users'
            //   }
            const stmt = ctx.db.prepare('SELECT * FROM Users LIMIT 10');
            const { results } = await stmt.all<UserDb>();

            return results?.map((user) => ({id: user.UserID, name: user.name, bio: user.bio}));
        } catch (e: any) {
            console.log({
                message: e.message,
                cause: e.cause.message,
            });
        
        }
    }),
    getUserById: t.procedure.input(z.string()).query(async ({ input, ctx }) => {
        const result = await ctx.db.prepare('SELECT * FROM Users where UserID = ?1').bind(input).first();
        // TODO parse into an object?
        return result;
    }),
    deleteUsers: t.procedure.mutation(async ({ctx}) => {
        await ctx.db.prepare('DELETE FROM Users').run();
    }),
    createUser: t.procedure
        // validate input with Zod
        .input(
            z.object({
                name: z.string().min(3),
                bio: z.string().max(142).optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const id = Date.now().toString();
            const user: User = { id, ...input };
            await ctx.db.prepare('INSERT INTO Users (UserID, name, bio) VALUES (?1, ?2, ?3);').bind(id, user.name, user.bio).run();
            return id;
        })
});

// The Astro API route, handling all incoming HTTP requests.
export const all: APIRoute = ({ request }) => {    
    return fetchRequestHandler({
        req: request,
        endpoint: trpcApiPath,
        router: appRouter,
        createContext
    });
};

export type AppRouter = typeof appRouter;
