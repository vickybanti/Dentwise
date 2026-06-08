"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createDoctor, getAvailableDoctors, getDoctors, updateDoctor} from "@/lib/actions/doctors";

export function useDoctors() {
    const result = useQuery({
        queryKey: ["getDoctors"],
        queryFn: getDoctors
    })
    return result
}

export function useCreateDoctor() {
    //UPDATE CACHE ON CLIENT SIDE FOR FASTER LOADING AND UPDATE FROM DB
    const queryClient = useQueryClient();

    const mutation =  useMutation({
        mutationFn: createDoctor,
        onSuccess:()=>{
            //invalidate related queries to refresh the data
            queryClient.invalidateQueries({queryKey:["getDoctors"]})},
        onError:()=>console.log("Doctor already created"),
    })
    return mutation;
}

export function useUpdateDoctor() {
    //UPDATE CACHE ON CLIENT SIDE FOR FASTER LOADING AND UPDATE FROM DB
    const queryClient = useQueryClient();

    const mutation =  useMutation({
        mutationFn: updateDoctor,
        onSuccess:()=>{
            //invalidate related queries to refresh the data
            queryClient.invalidateQueries({queryKey:["getDoctors"]})},
        onError:()=>console.log("Doctor already created"),
    })
    return mutation;
}

export function useAvailableDoctors() {
    const result = useQuery({
        queryKey: ["getAvailableDoctors"],
        queryFn: getAvailableDoctors,
    });

    return result;
}
