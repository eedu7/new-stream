import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <main className="grid min-h-screen place-content-center">{children}</main>;
}
