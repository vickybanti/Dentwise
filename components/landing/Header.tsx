"use client"

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {SignInButton, SignUpButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";

const Header = () => {
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-black/80 backdrop-blur-md h-16">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt={"logo"} width={32} height={32} className="w-11" />
                    <span className="font-semibold text-lg text-white">DentWise</span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <a href={"#"} className="text-muted foreground hover:text-foreground">How it works</a>
                    <a href={"#"} className="text-muted foreground hover:text-foreground">Pricing</a>
                    <a href={"#"} className="text-muted foreground hover:text-foreground">About</a>
                    <a href={"#"} className="text-muted foreground hover:text-foreground">About</a>
                </div>

                <div className="flex items-center gap-3 text-white">
                    <SignInButton mode={"modal"}>
                        <Button variant="ghost" size={"sm"}>Sign In</Button>
                        </SignInButton>
                    <SignUpButton mode="modal">
                        <Button size={"sm"} >Sign Up</Button>
                        </SignUpButton>
                </div>
            </div>

        </nav>
    )
}
export default Header
