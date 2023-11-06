import { prisma } from "$lib/PrismaClient";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.auth.validate();
    if(!session) return;

    const notes = await prisma.note.findMany({
        where:{
            userId:session.user.userId
        }
    });

    return {user: session.user, notes};
}

export const actions: Actions = {
    save: async ({locals, request}) => {
        const session = await locals.auth.validate();
        if(!session) return fail(401);

        const data = await request.formData();

        const formId = data.get("id");

        const formTitle = data.get("title");
        if(!formTitle) return fail(400, {formTitle, missing:true})

        const formBody = data.get("body");
        if(!formBody) return fail(400, {formBody, missing:true})

        const formLat = data.get("lat");
        if(!formLat) return fail(400, {formLat, missing:true})

        const formLng = data.get("lng");
        if(!formLng) return fail(400, {formLng, missing:true})

        const title = formTitle.toString();
        const body = formBody.toString();
        const lat = parseFloat(formLat.toString());
        const lng = parseFloat(formLng.toString())
        

        if(!formId){
            await prisma.note.create({
                data:{
                    userId:session.user.userId,
                    title,
                    body,
                    lat,
                    lng
                }
            })  
        } else{
            const id = formId?.toString();
            await prisma.note.update({
                where:{
                    id: id
                },
                data:{
                    title, body, lat, lng
                }
            })
        }



        return { success: true };


    },
    delete: async ({locals, request}) => {
        const session = await locals.auth.validate();
        if(!session) return fail(401);

        const data = await request.formData();
        const formId = data.get('id');

        if(!formId) return fail(400, {formId, missing:true});
        const id = formId.toString();

        await prisma.note.delete({
            where:{
                id,
                userId: session.user.userId
            }
        });
        return {success:true}

    }
}