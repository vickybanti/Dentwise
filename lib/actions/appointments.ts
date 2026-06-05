"use server"

import prisma from "@/lib/prisma";

export async function getAppointments() {
    try {
        const result = await prisma.appointment.findMany({
            include:{
                User:{
                    select:{
                    firstName:true,
                    lastName:true,
                    email:true
                    }

                },
                Doctor:{select:{name:true, imageUrl:true}}
            },
            orderBy:{createdAt:"desc"}
        });
        return result
    } catch (e) {

    }
}