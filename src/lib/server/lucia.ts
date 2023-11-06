import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import {discord} from "@lucia-auth/oauth/providers"
import { BASE_URL, DISCORD_ID, DISCORD_SECRET } from "$env/static/private";
import { prisma as client } from "$lib/PrismaClient";

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
    redirectUri: `${BASE_URL}/auth/login/discord/callback`
})

export type Auth = typeof auth;