import {redirect, fail, type Actions} from "@sveltejs/kit" 
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib";



export const load : PageServerLoad = async ({ cookies }) => {
    let username = cookies.get("username")
    if (username){
        throw redirect(307, "/")
    }
}


export const actions: Actions = {
    login: async ({ request, cookies}) => {
        let data = await request.formData();
        let username = data.get("username")?.toString();
        let password = data.get("password")?.toString();


        if (username && password) {
            const existingUser = await prisma.user.findUnique({
                where: { name: username }, // Replace 'name' with 'email' or provide the required 'id' property
            });

            if (existingUser) {
                if(existingUser.password === password){
                    cookies.set("username", username, {secure: false});
                    throw redirect(307, "/")

                } else {
                return fail(400, {password: "wrong password"})
                }
            } else {
                await prisma.user.create({
                    data: {
                        name: username,
                        password,
                    },
                });

                cookies.set("username", username, {secure: false});
                console.log(username + "logged in")
                throw redirect(307, "/")
            }
        } else {
            // todo: handle
            return fail(400, {username: "no username detected"})

        }
        console.log(username);
    },
    logout: async ({request, cookies}) => {
        let username = cookies.get("username");
        if(!username) {
            return fail(400, { username: "no username detected"});
        }

        
        cookies.delete("username")
    
        
    },
};



  

