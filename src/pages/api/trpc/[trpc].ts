import { initTRPC } from '@trpc/server';
import { Context, createContext, Env } from './context';
import { z } from 'zod';
import tRPCPlugin from "cloudflare-pages-plugin-trpc";

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
    getUsers: t.procedure.query(({ctx}) => {
        const result = ctx.db.exec('SELECT * FROM users');
        console.log({result});
        return result;
    }),
    createUser: t.procedure
        .input(
            z.object({
                name: z.string().min(3),
                bio: z.string().max(142).optional(),
            }),
        )
        .mutation(({ input, ctx }) => {
            const id = Date.now().toString();
            const statement = ctx.db.prepare("INSERT INTO users (id, title, body) VALUES (?, ?, ?)").bind(id, input.name, input.bio);
            const result = statement.run();
            console.log({result})

            const user: User = { id, ...input };
            users[user.id] = user;
            return id;
        })
});

export const all: PagesFunction<Env> = tRPCPlugin({
        endpoint: '/api/trpc',
        router: appRouter,
        createContext,
    });

export type AppRouter = typeof appRouter;
