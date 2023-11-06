import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client"
import { dev } from "$app/environment";
import {discord} from "@lucia-auth/oauth/providers"
import { DISCORD_ID, DISCORD_SECRET } from "$env/static/private";

const client = new PrismaClient();

export const auth = lucia({
    adapter:prisma(client),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),

    getUserAttributes: (data) => {
        return {
            username: data.username
        }
    }

});

export const discordAuth = discord(auth, {
    clientId: DISCORD_ID,
    clientSecret: DISCORD_SECRET,
    redirectUri: 'http://localhost:5173/auth/login/discord/callback'
})

export type Auth = typeof auth;