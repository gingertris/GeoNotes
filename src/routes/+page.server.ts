import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.auth.validate();
    if(!session) return;
    return {user: session.user};
}