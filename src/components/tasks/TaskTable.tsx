import React, {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Edit, Trash2, MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";

interface Task {
    id: string;
    title: string;
    dueDate: string;
    status: "to-do" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    assignee: {
        name: string;
        avatar?: string;
        initials: string;
    };
    project: string;
}

// Sample data
const tasksData: Task[] = [
    {
        id: "task-1",
        title: "Create new landing page design",
        dueDate: "2023-05-15",
        status: "in-progress",
        priority: "high",
        assignee: {
            name: "John Doe",
            initials: "JD",
        },
        project: "Website Redesign",
    },
    {
        id: "task-2",
        title: "Fix navigation menu bug",
        dueDate: "2023-05-10",
        status: "to-do",
        priority: "medium",
        assignee: {
            name: "Alice Smith",
            initials: "AS",
        },
        project: "Mobile App",
    },
    {
        id: "task-3",
        title: "Complete API documentation",
        dueDate: "2023-05-18",
        status: "review",
        priority: "low",
        assignee: {
            name: "Mike Johnson",
            initials: "MJ",
            avatar: "/placeholder.svg",
        },
        project: "Backend API",
    },
    {
        id: "task-4",
        title: "User testing session",
        dueDate: "2023-05-20",
        status: "to-do",
        priority: "urgent",
        assignee: {
            name: "Sarah Lee",
            initials: "SL",
        },
        project: "Website Redesign",
    },
    {
        id: "task-5",
        title: "Prepare presentation for client meeting",
        dueDate: "2023-05-12",
        status: "done",
        priority: "high",
        assignee: {
            name: "Tom Wilson",
            initials: "TW",
        },
        project: "Client Project",
    },
];

const TaskTable = () => {
    const [tasks, setTasks] = useState<Task[]>(tasksData);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [editedTask, setEditedTask] = useState<Task | null>(null);
    const {toast} = useToast();

    const handleStatusChange = (taskId: string, status: Task["status"]) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? {...task, status} : task
            )
        );
        toast({
            description: "Task status updated successfully.",
        });
    };

    const handleEditClick = (task: Task) => {
        setCurrentTask(task);
        setEditedTask({...task});
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (task: Task) => {
        setCurrentTask(task);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (currentTask) {
            setTasks(tasks.filter((task) => task.id !== currentTask.id));
            toast({
                description: "Task deleted successfully.",
            });
            setIsDeleteDialogOpen(false);
            setCurrentTask(null);
        }
    };

    const handleEditSave = () => {
        if (editedTask) {
            setTasks(
                tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
            );
            toast({
                description: "Task updated successfully.",
            });
            setIsEditDialogOpen(false);
            setCurrentTask(null);
            setEditedTask(null);
        }
    };

    const getPriorityColor = (priority: Task["priority"]) => {
        switch (priority) {
            case "low":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "medium":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "high":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
            case "urgent":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "";
        }
    };

    const getStatusColor = (status: Task["status"]) => {
        switch (status) {
            case "to-do":
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
            case "in-progress":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
            case "review":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
            case "done":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            default:
                return "";
        }
    };

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox/>
                            </TableHead>
                            <TableHead className="font-medium">Task</TableHead>
                            <TableHead className="font-medium">Status</TableHead>
                            <TableHead className="font-medium">Priority</TableHead>
                            <TableHead className="font-medium">Due Date</TableHead>
                            <TableHead className="font-medium">Assignee</TableHead>
                            <TableHead className="font-medium">Project</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getStatusColor(task.status)}>
                                        {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={getPriorityColor(task.priority)}>
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={task.assignee.avatar || ""} alt={task.assignee.name}/>
                                            <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{task.assignee.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{task.project}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditClick(task)}>
                                                <Edit className="mr-2 h-4 w-4"/>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDeleteClick(task)}>
                                                <Trash2 className="mr-2 h-4 w-4"/>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Task Dialog */}
            {editedTask && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                            <DialogDescription>
                                Make changes to the task below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium leading-none">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    value={editedTask.title}
                                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="status" className="text-sm font-medium leading-none">
                                        Status
                                    </label>
                                    <Select
                                        value={editedTask.status}
                                        onValueChange={(value) => setEditedTask({
                                            ...editedTask,
                                            status: value as Task["status"]
                                        })}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="to-do">To Do</SelectItem>
                                            <SelectItem value="in-progress">In Progress</SelectItem>
                                            <SelectItem value="review">Review</SelectItem>
                                            <SelectItem value="done">Done</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="priority" className="text-sm font-medium leading-none">
                                        Priority
                                    </label>
                                    <Select
                                        value={editedTask.priority}
                                        onValueChange={(value) => setEditedTask({
                                            ...editedTask,
                                            priority: value as Task["priority"]
                                        })}
                                    >
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder="Select priority"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="due-date" className="text-sm font-medium leading-none">
                                    Due Date
                                </label>
                                <Input
                                    id="due-date"
                                    type="date"
                                    value={editedTask.dueDate}
                                    onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditSave}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Task Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the task "{currentTask?.title}"
                            and remove it from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default TaskTable;
