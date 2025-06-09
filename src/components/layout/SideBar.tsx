import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {cn} from "@/lib/utils";
import {
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    User,
    Settings
} from "lucide-react";

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    to: string;
    collapsed: boolean;
}

const NavItem = ({icon: Icon, label, to, collapsed}: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to ||
        (to === "/settings" && location.pathname.startsWith("/settings"));

    return (
        <Link
            to={to}
            className={cn(
                "sidebar-link",
                isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            )}
            title={collapsed ? label : undefined}
        >
            <Icon size={18}/>
            {!collapsed && <span>{label}</span>}
        </Link>
    );
};

interface SidebarProps {
    onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar = ({onCollapseChange}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        onCollapseChange?.(newCollapsed);
    };

    return (
        <aside
            className={cn(
                "bg-sidebar h-screen fixed left-0 top-0 z-40 transition-all duration-300 border-r border-sidebar-border",
                collapsed ? "w-[60px]" : "w-[240px]"
            )}
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
                    {!collapsed && (
                        <span className="text-xl font-bold">ProdeXa</span>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
                    >
                        {collapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>}
                    </button>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1">
                    <NavItem icon={LayoutDashboard} label="Dashboard" to="/" collapsed={collapsed}/>
                </nav>


                <div className="p-2 border-t border-sidebar-border space-y-1">
                    <NavItem icon={User} label="Profile" to="/profile" collapsed={collapsed}/>
                    <NavItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed}/>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;