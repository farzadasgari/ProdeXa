import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface KanbanTask {
    id: string;
    title: string;
    description: string;
    status: "to-do" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    assignee: {
        name: string;
        avatar?: string;
        initials: string;
    };
    tags: string[];
    dueDate?: string;
}


const initialTasks: KanbanTask[] = [
    {
        id: "task1",
        title: "Create wireframes",
        description: "Design initial wireframes for the dashboard",
        status: "to-do",
        priority: "high",
        assignee: {
            name: "John Doe",
            initials: "JD",
        },
        tags: ["design", "ui"],
        dueDate: "2025-06-12",
    },
    {
        id: "task2",
        title: "Implement auth system",
        description: "Set up authentication with JWT",
        status: "in-progress",
        priority: "urgent",
        assignee: {
            name: "Farzad Asgari",
            initials: "FA",
        },
        tags: ["backend", "security"],
        dueDate: "2025-06-10",
    },
    {
        id: "task3",
        title: "Design logo",
        description: "Create a new logo for the product",
        status: "review",
        priority: "medium",
        assignee: {
            name: "Sarah Lee",
            initials: "SL",
        },
        tags: ["design", "branding"],
    },
    {
        id: "task4",
        title: "Fix navigation bug",
        description: "Mobile navigation menu doesn't work on iOS",
        status: "done",
        priority: "high",
        assignee: {
            name: "Alice Smith",
            initials: "AS",
        },
        tags: ["bug", "mobile"],
        dueDate: "2025-06-08",
    },
    {
        id: "task5",
        title: "User testing",
        description: "Conduct user testing for the new features",
        status: "to-do",
        priority: "medium",
        assignee: {
            name: "Tom Wilson",
            initials: "TW",
        },
        tags: ["testing", "ux"],
        dueDate: "2025-06-06",
    },
    {
        id: "task6",
        title: "API documentation",
        description: "Write documentation for REST API endpoints",
        status: "review",
        priority: "low",
        assignee: {
            name: "John Doe",
            initials: "JD",
        },
        tags: ["documentation", "api"],
    },
    {
        id: "task7",
        title: "Database optimization",
        description: "Optimize database queries for performance",
        status: "in-progress",
        priority: "high",
        assignee: {
            name: "Mike Johnson",
            initials: "MJ",
        },
        tags: ["database", "performance"],
        dueDate: "2023-06-04",
    },
    {
        id: "task8",
        title: "Payment integration",
        description: "Integrate Stripe payment gateway",
        status: "done",
        priority: "urgent",
        assignee: {
            name: "Sarah Lee",
            initials: "SL",
        },
        tags: ["payments", "integration"],
        dueDate: "2025-06-02",
    },
];

export function KanbanBoard() {
    const {toast} = useToast();
    const [tasks, setTasks] = useState(initialTasks);

    // Function to simulate drag-and-drop behavior
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("taskId", id);
    };

    const handleDrop = (e: React.DragEvent, newStatus: KanbanTask["status"]) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");

        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? {...task, status: newStatus} : task
            )
        );

        toast({
            description: `Task moved to ${newStatus.replace("-", " ")}`,
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const columns: { id: KanbanTask["status"]; title: string }[] = [
        {id: "to-do", title: "To Do"},
        {id: "in-progress", title: "In Progress"},
        {id: "review", title: "Review"},
        {id: "done", title: "Done"},
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
                <div key={column.id} className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{column.title}</h3>
                        <Badge variant="outline">
                            {tasks.filter((task) => task.status === column.id).length}
                        </Badge>
                    </div>
                    <div
                        className="bg-muted/40 rounded-lg p-3 flex-1 min-h-[500px]"
                        onDrop={(e) => handleDrop(e, column.id)}
                        onDragOver={handleDragOver}
                    >
                        <div className="space-y-3">
                            {tasks
                                .filter((task) => task.status === column.id)
                                .map((task) => (
                                    <Card
                                        key={task.id}
                                        className="bg-card cursor-move"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                    >
                                        <CardHeader className="p-3 pb-0">
                                            <CardTitle className="text-sm font-medium">
                                                {task.title}
                                            </CardTitle>
                                            <CardDescription className="text-xs mt-1">
                                                {task.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-2">
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {task.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div
                                                className="flex justify-between items-center text-xs text-muted-foreground">
                                                <div>
                          <span className={`priority-badge priority-${task.priority}`}>
                            {task.priority}
                          </span>
                                                </div>
                                                {task.dueDate && (
                                                    <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                                                )}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-3 pt-0 flex justify-between items-center">
                                            <div className="text-xs text-muted-foreground">
                                                {task.id}
                                            </div>
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage
                                                    src={task.assignee.avatar || ""}
                                                    alt={task.assignee.name}
                                                />
                                                <AvatarFallback className="text-xs">
                                                    {task.assignee.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                        </CardFooter>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default KanbanBoard;