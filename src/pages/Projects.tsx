import {useState} from "react";
import {PlusIcon, Search} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProjectCard from "@/components/projects/ProjectCard";

const projects = [
    {
        id: "proj-1",
        title: "Website Redesign",
        description: "Complete overhaul of the company website with new branding",
        status: "active" as const,
        progress: 75,
        members: [
            {name: "Farzad Asgari", initials: "FA"},
            {name: "Sarah Lee", initials: "SL"},
            {name: "Mike Johnson", initials: "MJ"},
        ],
        dueDate: "2025-06-12",
    },
    {
        id: "proj-2",
        title: "Mobile Application",
        description: "iOS and Android app for tracking tasks and projects",
        status: "active" as const,
        progress: 45,
        members: [
            {name: "Alice Smith", initials: "AS"},
            {name: "Farzad Asgari", initials: "FA"},
            {name: "John Doe", initials: "JD"},
            {name: "Mike Johnson", initials: "MJ"},
        ],
        dueDate: "2025-06-10",
    },
    {
        id: "proj-3",
        title: "Backend API Development",
        description: "RESTful API development for the new CRM system",
        status: "on-hold" as const,
        progress: 30,
        members: [
            {name: "Mike Johnson", initials: "MJ"},
            {name: "Tom Wilson", initials: "TW"},
        ],
        dueDate: "2025-06-08",
    },
    {
        id: "proj-4",
        title: "Marketing Campaign",
        description: "Q3 digital marketing campaign for product launch",
        status: "completed" as const,
        progress: 100,
        members: [
            {name: "Sarah Lee", initials: "SL"},
            {name: "Alice Smith", initials: "AS"},
        ],
        dueDate: "2025-06-06",
    },
    {
        id: "proj-5",
        title: "Customer Portal",
        description: "Self-service customer portal with account management",
        status: "active" as const,
        progress: 60,
        members: [
            {name: "Tom Wilson", initials: "TW"},
            {name: "John Doe", initials: "JD"},
            {name: "Sarah Lee", initials: "SL"},
            {name: "Farzad Asgari", initials: "FA"},
            {name: "Alice Smith", initials: "AS"},
        ],
        dueDate: "2025-06-04",
    },
    {
        id: "proj-6",
        title: "Internal Dashboard",
        description: "Analytics dashboard for internal teams",
        status: "active" as const,
        progress: 25,
        members: [
            {name: "Alice Smith", initials: "AS"},
            {name: "Farzad Asgari", initials: "FA"},
        ],
        dueDate: "2025-06-02",
    },
];

const Projects = () => {
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

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Project Added",
            description: "New project has been created successfully.",
        });
        setIsDialogOpen(false);
    };

    return (
        <PageLayout
            title="Projects"
            subtitle="Manage your active and upcoming projects"
        >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <form onSubmit={handleSearch} className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search projects..."
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="h-4 w-4 mr-1"/>
                                Add Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Add details for the new project below.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddProject}>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium leading-none">
                                            Project Title
                                        </label>
                                        <Input id="title" placeholder="Project title"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="description" className="text-sm font-medium leading-none">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Project description"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="status" className="text-sm font-medium leading-none">
                                                Status
                                            </label>
                                            <Select>
                                                <SelectTrigger id="status">
                                                    <SelectValue placeholder="Select status"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="on-hold">On Hold</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="due-date" className="text-sm font-medium leading-none">
                                                Due Date
                                            </label>
                                            <Input id="due-date" type="date"/>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">
                                            Team Members
                                        </label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Add team members"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="john">John Doe</SelectItem>
                                                <SelectItem value="sarah">Sarah Lee</SelectItem>
                                                <SelectItem value="mike">Mike Johnson</SelectItem>
                                                <SelectItem value="alice">Alice Smith</SelectItem>
                                                <SelectItem value="tom">Tom Wilson</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            <div
                                                className="bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">
                                                John Doe ✕
                                            </div>
                                            <div
                                                className="bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">
                                                Sarah Lee ✕
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create Project</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </PageLayout>
    );
};

export default Projects;