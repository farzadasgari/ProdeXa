import {Link} from "react-router-dom";
import {LayoutDashboard, CheckSquare} from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="bg-sidebar h-screen fixed left-0 top-0 w-[240px] border-r border-sidebar-border">
            <div className="p-4 border-b border-sidebar-border">
                <span className="text-xl font-bold">ProdeXa</span>
            </div>
            <nav className="p-2 space-y-1">
                <Link to="/" className="sidebar-link sidebar-link-inactive">
                    <LayoutDashboard size={18}/>
                    <span>Dashboard</span>
                </Link>
                <Link to="/tasks" className="sidebar-link sidebar-link-inactive">
                    <CheckSquare size={18}/>
                    <span>Tasks</span>
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;