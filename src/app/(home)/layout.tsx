import React from "react";
import { HomeLayout } from "@/modules/home/ui/layout/home-layout";

function Layout({ children }: { children: React.ReactNode }) {
    return <HomeLayout>{children}</HomeLayout>;
}

export default Layout;
