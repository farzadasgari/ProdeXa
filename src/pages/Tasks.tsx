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
                </div>
            </div>

            <div className="mt-6">
                <TaskTable/>
            </div>
        </PageLayout>
    );
};

export default Tasks;
