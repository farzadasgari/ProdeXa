import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import UserAvatar from "./UserAvatar";

interface Member {
    name: string;
    avatar?: string;
    initials: string;
}

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    status: "active" | "on-hold" | "completed";
    progress: number;
    members: Member[];
    dueDate: string;
}

export function ProjectCard({
                                id,
                                title,
                                description,
                                status,
                                progress,
                                members,
                                dueDate,
                            }: ProjectCardProps) {
    const statusColors = {
        active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        "on-hold": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
        completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <CardDescription className="mt-1">{description}</CardDescription>
                    </div>
                    <Badge className={statusColors[status]}>
                        {status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 pb-4">
                <div className="mt-2 space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2"/>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-2 flex justify-between items-center border-t">
                <div className="flex -space-x-2">
                    {members.slice(0, 4).map((member, i) => (
                        <UserAvatar
                            key={i}
                            name={member.name}
                            avatar={member.avatar}
                            initials={member.initials}
                            size="md"
                            className="hover:z-10"
                        />
                    ))}
                    {members.length > 4 && (
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium border-2 border-background">
                            +{members.length - 4}
                        </div>
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    Due: {formatDate(dueDate)}
                </div>
            </CardFooter>
        </Card>
    );
}

export default ProjectCard;
