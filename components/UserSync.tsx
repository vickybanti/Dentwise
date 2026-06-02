"use client"

import {useEffect} from 'react'
import {useUser} from "@clerk/nextjs";
import syncUser from "@/lib/actions/user";

export const UserSync = () => {

    const {isSignedIn, isLoaded} = useUser();

    useEffect(() => {
        const handleUSerSync = async () => {
            if (isLoaded && isSignedIn) {
                try {
                    await syncUser();
                } catch (error) {
                    console.log("Failed to log in", error);
                }
            }
        };
        handleUSerSync();
    }, [isLoaded, isSignedIn]);
    return null
}
