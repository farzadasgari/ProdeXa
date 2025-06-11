
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import TaskTable from "@/components/tasks/TaskTable";

const Tasks = () => {
    const { toast } = useToast();
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

            <div className="mt-6">
                <TaskTable />
            </div>
        </PageLayout>
    );
};

export default Tasks;
