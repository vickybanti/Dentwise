import {useQuery} from "@tanstack/react-query";
import {getDoctors} from "@/lib/actions/doctors";
import {getAppointments} from "@/lib/actions/appointments";

export const useAppointments = () => {
    const result = useQuery({
        queryKey: ["getAppointments"],
        queryFn: getAppointments
    });
    return result;
}