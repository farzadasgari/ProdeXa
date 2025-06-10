import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {CheckSquare, MessageSquare, FolderOpen} from "lucide-react";

interface ActivityItem {
    id: string;
    type: "task" | "comment" | "project";
    title: string;
    time: string;
    user: {
        name: string;
        avatar?: string;
        initials: string;
    };
    description?: string;
}

const activities: ActivityItem[] = [
    {
        id: "1",
        type: "task",
        title: "Completed task",
        time: "2 hours ago",
        user: {
            name: "John Doe",
            avatar: "/placeholder.svg",
            initials: "JD",
        },
        description: "Completed UI design for the dashboard layout",
    },
    {
        id: "2",
        type: "comment",
        title: "Added comment",
        time: "4 hours ago",
        user: {
            name: "Alice Smith",
            avatar: "/placeholder.svg",
            initials: "AS",
        },
        description: "Let's review this in our meeting tomorrow",
    },
    {
        id: "3",
        type: "project",
        title: "Created project",
        time: "1 day ago",
        user: {
            name: "Mike Johnson",
            avatar: "/placeholder.svg",
            initials: "MJ",
        },
        description: "Started new website redesign project",
    },
    {
        id: "4",
        type: "task",
        title: "Updated task",
        time: "1 day ago",
        user: {
            name: "Sarah Lee",
            avatar: "/placeholder.svg",
            initials: "SL",
        },
        description: "Changed deadline for content creation",
    },
    {
        id: "5",
        type: "comment",
        title: "Added comment",
        time: "2 days ago",
        user: {
            name: "Tom Wilson",
            avatar: "/placeholder.svg",
            initials: "TW",
        },
        description: "I've finished the backend API integration",
    },
];

const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
        case "task":
            return <CheckSquare className="h-4 w-4"/>;
        case "comment":
            return <MessageSquare className="h-4 w-4"/>;
        case "project":
            return <FolderOpen className="h-4 w-4"/>;
    }
};

export function ActivityFeed() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 border-b last:border-0 p-4"
                        >
                            <Avatar className="h-9 w-9">
                                <AvatarImage
                                    src={activity.user.avatar || ""}
                                    alt={activity.user.name}
                                />
                                <AvatarFallback>{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium leading-none">
                                        {activity.user.name}
                                    </p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {getActivityIcon(activity.type)}
                        {activity.title}
                    </span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default ActivityFeed;
