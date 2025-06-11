import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import TaskTable from "@/components/tasks/TaskTable";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {PlusIcon, Search} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Tasks = () => {
    const {toast} = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery) {
            toast({
                description: `Searching for: ${searchQuery}`,
            });
        }
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Task Added",
            description: "New task has been created successfully.",
        });
        setIsDialogOpen(false);
    };

    return (
        <PageLayout
            title="Tasks"
            subtitle="Manage and organize all your tasks"
        >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <form onSubmit={handleSearch} className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search tasks..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-[150px]">
                            <SelectValue placeholder="Filter by status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="to-do">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="h-4 w-4 mr-1"/>
                                Add Task
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                                <DialogTitle>Create New Task</DialogTitle>
                                <DialogDescription>
                                    Add details for the new task below.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddTask}>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium leading-none">
                                            Title
                                        </label>
                                        <Input id="title" placeholder="Task title"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="description" className="text-sm font-medium leading-none">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Task description"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="project" className="text-sm font-medium leading-none">
                                                Project
                                            </label>
                                            <Select>
                                                <SelectTrigger id="project">
                                                    <SelectValue placeholder="Select project"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="website">Website Redesign</SelectItem>
                                                    <SelectItem value="mobile">Mobile App</SelectItem>
                                                    <SelectItem value="api">Backend API</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="priority" className="text-sm font-medium leading-none">
                                                Priority
                                            </label>
                                            <Select>
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
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="due-date" className="text-sm font-medium leading-none">
                                                Due Date
                                            </label>
                                            <Input id="due-date" type="date"/>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="assignee" className="text-sm font-medium leading-none">
                                                Assignee
                                            </label>
                                            <Select>
                                                <SelectTrigger id="assignee">
                                                    <SelectValue placeholder="Assign to"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="john">John Doe</SelectItem>
                                                    <SelectItem value="mike">Mike Johnson</SelectItem>
                                                    <SelectItem value="sarah">Sarah Lee</SelectItem>
                                                    <SelectItem value="alice">Alice Smith</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="tags" className="text-sm font-medium leading-none">
                                            Tags
                                        </label>
                                        <Input id="tags" placeholder="Enter tags separated by commas"/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create Task</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="mt-6">
                <TaskTable/>
            </div>
        </PageLayout>
    );
};

export default Tasks;
