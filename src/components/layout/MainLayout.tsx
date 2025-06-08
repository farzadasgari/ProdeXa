import {ReactNode, useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {cn} from "@/lib/utils";
import SideBar from "./SideBar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleCollapseChange = (newCollapsed: boolean) => {
        if (!isMobile) {
            setCollapsed(newCollapsed);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <SideBar onCollapseChange={handleCollapseChange}/>
            <div className={cn(
                "transition-all duration-300 ease-in-out",
                collapsed ? "ml-[60px]" : "ml-[240px]"
            )}>
                <main className="min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;