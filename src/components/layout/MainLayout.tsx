import {ReactNode} from "react";

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}

const MainLayout = ({children, title = "ProdeXa"}: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-background">
            <header className="bg-sidebar p-4 border-b">
                <h1 className="text-xl font-bold text-sidebar-foreground">{title}</h1>
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
};

export default MainLayout;