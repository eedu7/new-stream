import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    title: string;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({ title, onOpenChange, open, children }: ResponsiveModalProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer
                open={open}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>
                    {children}
                </DrawerContent>
            </Drawer>
        );
    } else {
        return (
            <Dialog
                onOpenChange={onOpenChange}
                open={open}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }
};
