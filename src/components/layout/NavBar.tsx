import {useState} from "react";
import {Bell, Search} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ThemeToggle from "../ThemeToggle";
import {Link} from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import NotificationItem from "../notifications/NotificationItem";

const notificationsData = [
    {
        id: "1",
        title: "New task assigned",
        description: "You've been assigned to the Website Redesign project",
        time: "Just now",
        read: false,
    },
    {
        id: "2",
        title: "Meeting reminder",
        description: "Team meeting starts in 30 minutes",
        time: "30 min ago",
        read: false,
    },
    {
        id: "3",
        title: "Task completed",
        description: "Farzad completed the API documentation task",
        time: "2 hours ago",
        read: true,
    },
];

const NavBar = () => {
    const {toast} = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState(notificationsData);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const unreadCount = notifications.filter(notification => !notification.read).length;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            toast({
                title: "Search initiated",
                description: `Searching for: ${searchQuery}`,
            });
        }
    };

    const handleNotificationClick = (id: string) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? {...notification, read: true} : notification
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({...notification, read: true})));
        toast({
            title: "Notifications",
            description: "All notifications marked as read",
        });
    };

    return (
        <header className="bg-background sticky top-0 z-30 flex h-16 items-center border-b px-4 md:px-6">
            <div className="flex flex-1 items-center justify-between">
                <form onSubmit={handleSearch} className="hidden md:flex relative w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search tasks, projects, or team members..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <div className="flex items-center gap-2">
                    <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                            >
                                <Bell className="h-5 w-5"/>
                                {unreadCount > 0 && (
                                    <span
                                        className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0" align="end">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h3 className="font-medium">Notifications</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={markAllAsRead}
                                    disabled={unreadCount === 0}
                                >
                                    Mark all as read
                                </Button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            notification={notification}
                                            onClick={() => handleNotificationClick(notification.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-muted-foreground">
                                        No notifications
                                    </div>
                                )}
                            </div>
                            <div className="p-2 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    asChild
                                >
                                    <Link to="/settings?tab=notifications">View all notifications</Link>
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <ThemeToggle/>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg" alt="User"/>
                                    <AvatarFallback>FA</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Farzad Asgari</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        khufarzadasgari@gmail.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem asChild>
                                <Link to="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/settings?tab=notifications">Notifications</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
