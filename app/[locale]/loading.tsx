import Image from "next/image";
import logo from "@/public/logo-small.svg"

export default function Loading() {
    return (
       <div className="w-full text-center pt-52">
         <Image 
            src={logo} 
            className="inline-block animate-spin"
            alt="loading" 
        />
       </div>
    )
}