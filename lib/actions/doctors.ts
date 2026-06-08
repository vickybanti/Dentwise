"use server";

import prisma from "@/lib/prisma";
import {Doctor, Gender} from "@/src/generated/prisma/client";
import {generateAvatar} from "@/lib/utils";
import {revalidatePath} from "next/cache";
import {error} from "effect/Brand";

export async function getDoctors() {
    try {
        const doctors = await prisma.doctor.findMany({
            include: {
                _count: {
                    select: {
                        Appointment: true,
                    },
                },
            },
        });

        return doctors.map((doctor) => ({
            ...doctor,
            appointmentCount: doctor._count.Appointment,
        }));
    } catch (e) {
        console.error("Error fetching doctors:", e);
        throw new Error("Failed to fetch doctors");
    }
}


interface CreateDoctorInput {
    name: string;
    email: string;
    phone: string;
    speciality: string;
    gender: Gender;
    isActive: boolean;

}
export async function createDoctor(input: CreateDoctorInput) {
    try {
        if(!input.name || !input.email ) throw new Error("Name or Email is required");

        const doctor = await prisma.doctor.create({
            data:{
                ...input,
                imageUrl:generateAvatar(input.name,input.gender)
            }
        })
        revalidatePath("/admin")
        return doctor;
    }catch (error:any) {
        console.log(error)
        if(error?.code === "P2002") {
            throw  new Error("A doctor with this email already exists");
        }
    }
}

interface UpdateDoctorInput  extends Partial<CreateDoctorInput>{
    id: string;
}
export async function updateDoctor(input: UpdateDoctorInput) {
    try {
        if (!input.name || !input.email) throw new Error("Name or Email is required");

        const currentDoctor = await prisma.doctor.findUnique({
            where: {
                id: input.id
            },
            select: {email: true}
        });

        if (!currentDoctor) throw new Error("Doctor not found");

        if (input.email !== currentDoctor.email) {
            throw new Error("A doctor with this email already exists");
        }


        const doctor = await prisma.doctor.update({
            where: {id: input.id},
            // using  ....input in data is going to trigger a unique violation for email
            data: {
                name: input.name,
                email: input.email,
                phone: input.phone,
                speciality: input.speciality,
                gender: input.gender,
                isActive: input.isActive,
            },
        });
        return doctor;

    } catch (error) {
        console.log("Error updating doctor", error)
    }
}

export async function getAvailableDoctors() {
    try {
        const doctors = await prisma.doctor.findMany({
            where: { isActive: true },
            include: {
                _count: {
                    select: { Appointment: true },
                },
            },
            orderBy: { name: "asc" },
        });

        return doctors.map((doctor) => ({
            ...doctor,
            appointmentCount: doctor._count.Appointment,
        }));
    } catch (error) {
        console.error("Error fetching available doctors:", error);
        throw new Error("Failed to fetch available doctors");
    }
}