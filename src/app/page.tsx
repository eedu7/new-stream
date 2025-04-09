import Image from "next/image";

export default function Home() {
    return (
        <div className="text-primary cursor-pointer border-0">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={50}
            />
        </div>
    );
}
