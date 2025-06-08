import { ReactNode } from "react";
import SideBar from "./SideBar";

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}

const MainLayout = ({ children, title = "ProdeXa" }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-background flex">
            <SideBar />
            <div className="flex-1 ml-[240px]">
                <header className="bg-sidebar p-4 border-b">
                    <h1 className="text-xl font-bold text-sidebar-foreground">{title}</h1>
                </header>
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;