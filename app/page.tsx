import Image from "next/image";
import {SignUpButton, SignInButton, Show, UserButton} from "@clerk/nextjs";

export default function Home() {
  return (
   <div>
       <h1>HomePage</h1>
       <Show when="signed-out">
           <SignInButton />
       <SignUpButton mode="modal">Sign up</SignUpButton>
           </Show>
           <Show when="signed-in">
               <UserButton />
           </Show>

   </div>
  );
}
