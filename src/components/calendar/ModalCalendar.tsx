import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {CalendarClock} from "lucide-react";
import {format} from "date-fns";

interface AddTaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedDate?: Date;
}

export function AddTaskModal({open, onOpenChange, selectedDate}: AddTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [project, setProject] = useState("");
    const [dueDate, setDueDate] = useState<Date | undefined>(selectedDate);
    const [assignee, setAssignee] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically save the task
        console.log({
            title,
            description,
            priority,
            project,
            dueDate,
            assignee,
        });

        // Reset form and close modal
        setTitle("");
        setDescription("");
        setPriority("");
        setProject("");
        setDueDate(undefined);
        setAssignee("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        Create a new task and assign it to your calendar.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter task description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select value={priority} onValueChange={setPriority}>
                                <SelectTrigger>
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

                        <div className="space-y-2">
                            <Label htmlFor="project">Project</Label>
                            <Select value={project} onValueChange={setProject}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select project"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="website">Website Redesign</SelectItem>
                                    <SelectItem value="mobile">Mobile App</SelectItem>
                                    <SelectItem value="backend">Backend API</SelectItem>
                                    <SelectItem value="marketing">Marketing Site</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarClock className="mr-2 h-4 w-4"/>
                                        {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={setDueDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="assignee">Assignee</Label>
                            <Select value={assignee} onValueChange={setAssignee}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign to..."/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="john">John Doe</SelectItem>
                                    <SelectItem value="sarah">Sarah Lee</SelectItem>
                                    <SelectItem value="mike">Mike Johnson</SelectItem>
                                    <SelectItem value="alice">Alice Smith</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
