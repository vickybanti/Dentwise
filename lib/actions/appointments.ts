"use server"

import prisma from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import {Appointment} from "@/src/generated/prisma/client";

function transformAppointments(appointment: any) {
    return {
        ...appointment,
        patientName:`${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
        patientEmail:appointment.user.email,
        doctorName: appointment.doctor.name,
        doctorImageUrl: appointment.doctor.imageUrl || "",
        date: appointment.date.toISOString().split("T")[0],
    }
}
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

export async function getUserAppointmentStats() {
    try {
        const {userId} = await auth();


        if(!userId) throw new Error("User must be authenticated");

        const user = await prisma.user.findUnique({where:{clerkId:userId}})

        if(!user) throw new Error("User does not exist");
        const [totalCount, completedCount] = await Promise.all([
            prisma.appointment.count({
                where: {userId: user?.id},
            }),
        prisma.appointment.count({
            where: {
                userId: user?.id,
                status:"COMPLETED"
            }
        })
        ])

        return {
            totalAppointments: totalCount,
            completedAppointment: completedCount
        }
    } catch (e) {
        console.log("error fetching user appointments",e)
        return {totalAppointments: 0, completedAppointment: 0};
    }
}

export async function getUserAppointments() {
    try {
        const {userId} = await auth();

        if (!userId) throw new Error("User must be logged in to view appointments");

        const user = await prisma.user.findUnique({where:{clerkId:userId}});

        if(!user) throw new Error("User does not exist");

        const appointments = await prisma.appointment.findMany({
            where:{userId: user.id},
            include: {
                User:{select:{firstName: true, lastName:true, email:true}},
                Doctor:{ select:{name:true, imageUrl:true}},
            },
            orderBy:[{date:"desc"},{time:"asc"}],
        });
        return appointments.map(transformAppointments);
    } catch (e) {
        console.log("error fetching user appointments",e)
        throw new Error("error fetching user appointments")
    }
}