import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) => {
    const session = await locals.auth.validate();
    if(!session) return;

    const markers = [
        {lat:52.471971891143866, lng:-1.913198232650757, title:"Uni accom", note:"This is where i lived at uni"},
        {lat:52.08615185068389, lng:-0.7118368148803712, title:"Home", note:"This is where i live at home"},
    ]

    return {user: session.user, markers};
}