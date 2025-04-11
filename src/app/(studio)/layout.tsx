import React from "react";
import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout";

function Layout({ children }: { children: React.ReactNode }) {
    return <StudioLayout>{children}</StudioLayout>;
}

export default Layout;
