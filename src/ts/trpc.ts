import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { users } from '../db/schema/users';
import type { Context } from './context';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm/expressions';

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
            return ctx.db.select().from(users).all();
        } catch (e: any) {
            console.log({
                message: e.message,
                cause: e.cause.message,
            });
        }
    }),
    getUserById: publicProcedure.input(z.object({id: z.string()})).query(async ({ input, ctx }) => {
        return ctx.db.select().from(users).where(eq(users.id, input.id)).get();
    }),
    deleteUsers: publicProcedure.mutation(async ({ ctx }) => {
        const result = await ctx.db.delete(users).run();
        console.log({result});
    }),
    deleteUser: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await ctx.db.delete(users).where(eq(users.id, input.id)).run();
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
            try {
                const result = await ctx.db.insert(users).values({ id: uuidv4(), name: input.name, bio: input.bio }).returning({id: users.id}).get();
                return result.id;
            } catch (e: any) {
                console.log({
                    message: e.message,
                    cause: e.cause.message,
                });
            }
        })
});



export type AppRouter = typeof appRouter;
