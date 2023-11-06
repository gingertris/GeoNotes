import { auth } from "$lib/server/lucia";
import type { RequestHandler } from "@sveltejs/kit";

export const GET:RequestHandler = async ({locals}) => {
    const session = await locals.auth.validate();
    if(!session) return new Response(null, {
        status:302,
        headers:{
            Location: "/"
        }
    });
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    return new Response(null, {
        status:302,
        headers:{
            Location: "/"
        }
    })
}