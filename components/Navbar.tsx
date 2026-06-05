"use client"
import React from 'react'
import {UserButton, useUser} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {CalendarIcon, CrownIcon, HomeIcon} from "lucide-react";

const Navbar = () => {
    const {user} = useUser();
    const pathname = usePathname()


    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-black/80 backdrop-blur-md h-16">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-full">

                <div className="flex items-center gap-8">
                    <Link href={"/dashbaord"} className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Dentwise logo" width={32} height={32} className={"w-11"} />
                    </Link>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard"
                          className={`flex items-center gap=2 transition-colors ${
                              pathname === "/dashboard" ? "text-white/90 hover:text-white/40 font-medium"
                              : "text-white/40 hover:text-white/70"
                          }`}
                          >
                    <HomeIcon className="w-4 h-4"/>
                    <span className="hidden md:inline pl-2">Dashboard</span>
                    </Link>
                    </div>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard/appointments"
                          className={`flex items-center gap=2 transition-colors ${
                              pathname === "/dashboard" ? "text-white/90 hover:text-white/40 font-medium"
                                  : "text-white/40 hover:text-white/70"
                          }`}
                    >
                        <CalendarIcon className="w-4 h-4"/>
                        <span className="hidden md:inline pl-2">Appointments</span>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/voice"
                          className={`flex items-center gap=2 transition-colors ${
                              pathname === "/dashboard" ? "text-white/90 hover:text-white/40 font-medium"
                                  : "text-white/40 hover:text-white/70"
                          }`}
                    >
                        <CrownIcon className="w-4 h-4"/>
                        <span className="hidden md:inline pl-2">Voice</span>
                    </Link>
                </div>
            </div>

            {/*RIGHT SECTION*/}

            <div className="flex items-center gap=4">
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex flex-col items-end">
                        <span className="text-sm font-medium text-white/60">
                            {user?.firstName} {user?.lastName}
                        </span>
                        <span className="text-xs text-white/40">
                            {user?.emailAddresses?.[0]?.emailAddress}
                            </span>
                    </div>

                    <UserButton />
                </div>
            </div>
            </div>
        </nav>
    )
}
export default Navbar
