"use server"

import prisma from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import {Appointment, AppointmentStatus} from "@/src/generated/prisma/client";

function transformAppointments(appointment: any) {
    return {
        ...appointment,
        patientName: `${appointment.User.firstName || ""} ${appointment.User.lastName || ""}`.trim(),
        patientEmail: appointment.User.email,
        doctorName: appointment.Doctor.name,
        doctorImageUrl: appointment.Doctor.imageUrl,
        date: appointment.date.toISOString().split("T")[0],
    };
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
export async function getBookedTimeSlots(doctorId: string, date: string) {
    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                date: new Date(date),
                status: {
                    in: ["CONFIRMED", "COMPLETED"], // consider both confirmed and completed appointments as blocking
                },
            },
            select: { time: true },
        });

        return appointments.map((appointment) => appointment.time);
    } catch (error) {
        console.error("Error fetching booked time slots:", error);
        return []; // return empty array if there's an error
    }
}

interface BookAppointmentInput {
    doctorId: string;
    date: string;
    time: string;
    reason?: string;
}

export async function bookAppointment(input: BookAppointmentInput) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("You must be logged in to book an appointment");

        if (!input.doctorId || !input.date || !input.time) {
            throw new Error("Doctor, date, and time are required");
        }

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user) throw new Error("User not found. Please ensure your account is properly set up.");

        const appointment = await prisma.appointment.create({
            data: {
                userId: user.id,
                doctorId: input.doctorId,
                date: new Date(input.date),
                time: input.time,
                reason: input.reason || "General consultation",
                status: "CONFIRMED",
            },
            include: {
                User: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                Doctor: { select: { name: true, imageUrl: true } },
            },
        });

        return transformAppointments(appointment);
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw new Error("Failed to book appointment. Please try again later.");
    }
}

export async function updateAppointmentStatus(input: { id: string; status: AppointmentStatus }) {
    try {
        const appointment = await prisma.appointment.update({
            where: { id: input.id },
            data: { status: input.status },
        });

        return appointment;
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw new Error("Failed to update appointment");
    }
}
