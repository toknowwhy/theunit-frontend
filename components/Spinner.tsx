import Image from "next/image";
import logo from "@/public/logo-small.svg"

export default function Spinner({ small = false } : { small?: boolean }) {
    return (
        <Image 
            src={logo} 
            className="inline-block animate-spin"
            alt="loading" 
            width={small ? 24 : 68}
            height={small ? 24 : 68}
        />
    )
}