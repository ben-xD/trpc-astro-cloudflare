import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from './context.js';

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
const t = initTRPC.context<Context>().create();
// const middleware = t.middleware;

// const cors = middleware(async ({ ctx, next }) => {
//     console.log("Running cors middleware")
//     // Set the Access-Control-Allow-Origin header to allow all localhost servers
//     const origin = new URL(ctx.req.url).origin;
//     ctx.resHeaders.set('Access-Control-Allow-Origin', origin);
//     // ctx.resHeaders.set('Access-Control-Allow-Origin', 'http://localhost:*');
//     console.log({origin})
//     // console.log((ctx.req.url as URL).origin)
//     return next({
//         ctx,
//     });
// });

const publicProcedure = t.procedure;

export const appRouter = t.router({
    getUsers: publicProcedure.query(async ({ ctx }) => {
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

            return results?.map((user) => ({ id: user.UserID, name: user.name, bio: user.bio }));
        } catch (e: any) {
            console.log({
                message: e.message,
                cause: e.cause.message,
            });

        }
    }),
    getUserById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
        const result: UserDb = await ctx.db.prepare('SELECT * FROM Users where UserID = ?1').bind(input).first();
        return { id: result.UserID, name: result.name, bio: result.bio };
    }),
    deleteUsers: publicProcedure.mutation(async ({ ctx }) => {
        await ctx.db.prepare('DELETE FROM Users').run();
    }),
    createUser: publicProcedure
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



export type AppRouter = typeof appRouter;
