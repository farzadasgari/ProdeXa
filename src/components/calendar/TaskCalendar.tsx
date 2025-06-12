import {useMemo, useState} from "react";
import {format, startOfWeek, endOfWeek, eachDayOfInterval, startOfDay, endOfDay, addDays} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CheckCircle, Clock, Plus} from "lucide-react";

interface CalendarTask {
    id: string;
    title: string;
    date: Date;
    time?: string;
    priority: "low" | "medium" | "high" | "urgent";
    project: string;
    completed: boolean;
    description?: string;
    assignee: {
        name: string;
        avatar?: string;
        initials: string;
    };
}

interface TaskCalendarProps {
    onDateSelect?: (date?: Date) => void;
}

// Extended sample tasks data
const tasksData: CalendarTask[] = [
    {
        id: "task1",
        title: "Team meeting",
        date: new Date(2023, 5, 10, 10, 30),
        time: "10:30 AM",
        priority: "medium",
        project: "General",
        completed: false,
        description: "Weekly team sync-up to discuss project progress",
        assignee: {
            name: "John Doe",
            avatar: "/placeholder.svg",
            initials: "JD",
        }
    },
    {
        id: "task2",
        title: "Design review",
        date: new Date(2023, 5, 15, 14, 0),
        time: "2:00 PM",
        priority: "high",
        project: "Website Redesign",
        completed: false,
        description: "Review latest design mockups with the client",
        assignee: {
            name: "Alice Smith",
            avatar: "/placeholder.svg",
            initials: "AS",
        }
    },
    {
        id: "task3",
        title: "Client presentation",
        date: new Date(2023, 5, 18, 11, 0),
        time: "11:00 AM",
        priority: "urgent",
        project: "Client Project",
        completed: false,
        description: "Final presentation of the marketing campaign",
        assignee: {
            name: "Mike Johnson",
            avatar: "/placeholder.svg",
            initials: "MJ",
        }
    },
    {
        id: "task4",
        title: "Bug fixing",
        date: new Date(2023, 5, 20, 9, 0),
        time: "9:00 AM",
        priority: "medium",
        project: "Mobile App",
        completed: true,
        description: "Fix critical bugs in the latest release",
        assignee: {
            name: "Sarah Lee",
            avatar: "/placeholder.svg",
            initials: "SL",
        }
    },
    {
        id: "task5",
        title: "Planning session",
        date: new Date(2023, 5, 25, 13, 30),
        time: "1:30 PM",
        priority: "low",
        project: "General",
        completed: false,
        description: "Q3 planning session",
        assignee: {
            name: "Tom Wilson",
            avatar: "/placeholder.svg",
            initials: "TW",
        }
    },
    {
        id: "task6",
        title: "Code review",
        date: new Date(2023, 5, 10, 15, 0),
        time: "3:00 PM",
        priority: "high",
        project: "Mobile App",
        completed: false,
        description: "Review backend API implementation",
        assignee: {
            name: "Mike Johnson",
            avatar: "/placeholder.svg",
            initials: "MJ",
        }
    },
    {
        id: "task7",
        title: "Interview candidate",
        date: new Date(2023, 5, 12, 11, 0),
        time: "11:00 AM",
        priority: "medium",
        project: "General",
        completed: false,
        description: "Interview for senior developer position",
        assignee: {
            name: "John Doe",
            avatar: "/placeholder.svg",
            initials: "JD",
        }
    },
];

export function TaskCalendar({onDateSelect}: TaskCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [view, setView] = useState<"month" | "week" | "day">("month");
    const [projectFilter, setProjectFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [showCompleted, setShowCompleted] = useState<boolean>(true);

    // Filter tasks based on project and priority
    const filteredTasks = useMemo(() => {
        return tasksData.filter(task =>
            (projectFilter === "all" || task.project === projectFilter) &&
            (priorityFilter === "all" || task.priority === priorityFilter) &&
            (showCompleted || !task.completed)
        );
    }, [projectFilter, priorityFilter, showCompleted]);

    // Calculate tasks for the selected date/period
    const selectedTasks = useMemo(() => {
        if (!date) return [];

        switch (view) {
            case "month":
                // For month view, show tasks for the selected date only
                return filteredTasks.filter(
                    (task) =>
                        task.date.getDate() === date.getDate() &&
                        task.date.getMonth() === date.getMonth() &&
                        task.date.getFullYear() === date.getFullYear()
                );
            case "week":
                // For week view, show tasks for the week containing the selected date
                const weekStart = startOfWeek(date, {weekStartsOn: 1});
                const weekEnd = endOfWeek(date, {weekStartsOn: 1});

                return filteredTasks.filter(
                    (task) => task.date >= weekStart && task.date <= weekEnd
                );
            case "day":
                // For day view, show tasks for the selected date only
                const dayStart = startOfDay(date);
                const dayEnd = endOfDay(date);

                return filteredTasks.filter(
                    (task) => task.date >= dayStart && task.date <= dayEnd
                );
            default:
                return [];
        }
    }, [date, view, filteredTasks]);

    // Get unique projects for filter
    const projects = useMemo(() => {
        const uniqueProjects = new Set(tasksData.map(task => task.project));
        return Array.from(uniqueProjects);
    }, []);

    // Get dates with tasks for calendar highlighting
    const datesWithTasks = useMemo(() =>
            filteredTasks.map((task) => task.date),
        [filteredTasks]);

    // For week view - get the days of the week
    const weekDays = useMemo(() => {
        if (!date) return [];
        const weekStart = startOfWeek(date, {weekStartsOn: 1});
        return eachDayOfInterval({
            start: weekStart,
            end: addDays(weekStart, 6)
        });
    }, [date]);

    // Function to get tasks for a specific day (for week view)
    const getTasksForDay = (day: Date) => {
        const dayStart = startOfDay(day);
        const dayEnd = endOfDay(day);

        return filteredTasks.filter(
            (task) => task.date >= dayStart && task.date <= dayEnd
        );
    };

    // Function to get priority color
    const getPriorityColor = (priority: CalendarTask["priority"]) => {
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

    // Render the calendar based on view
    const renderCalendarContent = () => {
        switch (view) {
            case "month":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
                        <Card>
                            <CardHeader className="py-3 px-4">
                                <CardTitle className="text-sm font-medium">Calendar</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border pointer-events-auto"
                                    modifiers={{
                                        hasTasks: datesWithTasks,
                                    }}
                                    modifiersClassNames={{
                                        hasTasks: "font-bold text-primary relative after:content-['•'] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2",
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {date ? format(date, 'EEEE, MMMM d, yyyy') : "No date selected"}
                                </CardTitle>
                                <CardDescription>
                                    {selectedTasks.length} tasks scheduled
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {selectedTasks.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedTasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="p-4 border rounded-md flex justify-between items-center"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={`mt-0.5 w-4 h-4 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}/>
                                                    <div>
                                                        <div className="font-medium flex items-center gap-2">
                                                            {task.title}
                                                            {task.completed && (
                                                                <CheckCircle className="h-4 w-4 text-green-500"/>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mt-1">
                                                            Project: {task.project}
                                                        </div>
                                                        {task.time && (
                                                            <div
                                                                className="flex items-center text-xs text-muted-foreground mt-1">
                                                                <Clock className="h-3 w-3 mr-1"/>
                                                                {task.time}
                                                            </div>
                                                        )}
                                                        {task.description && (
                                                            <div className="text-sm mt-2">{task.description}</div>
                                                        )}
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarImage
                                                                    src={task.assignee.avatar || ""}
                                                                    alt={task.assignee.name}
                                                                />
                                                                <AvatarFallback
                                                                    className="text-xs">{task.assignee.initials}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="text-xs">{task.assignee.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge className={getPriorityColor(task.priority)}>
                                                    {task.priority}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-muted-foreground">No tasks for this date</p>
                                        <Button variant="outline" size="sm" className="mt-4"
                                                onClick={() => onDateSelect?.(date)}>
                                            <Plus className="h-4 w-4 mr-1"/>
                                            Add Task
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                );
            case "week":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Week of {date ? format(startOfWeek(date, {weekStartsOn: 1}), 'MMM d') : ""}
                                {" - "}
                                {date ? format(endOfWeek(date, {weekStartsOn: 1}), 'MMM d, yyyy') : ""}
                            </CardTitle>
                            <CardDescription>
                                Weekly schedule view
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-2">
                                {weekDays.map((day) => {
                                    const dayTasks = getTasksForDay(day);

                                    return (
                                        <div key={day.toString()} className="min-h-[20rem]">
                                            <div className={`p-2 text-center sticky top-0 bg-background ${
                                                format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-muted' : ''
                                            }`}>
                                                <div className="font-medium">{format(day, 'EEE')}</div>
                                                <div className={`text-2xl ${
                                                    format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'text-primary font-bold' : ''
                                                }`}>
                                                    {format(day, 'd')}
                                                </div>
                                            </div>
                                            <div className="space-y-2 mt-2">
                                                {dayTasks.length > 0 ? (
                                                    dayTasks.map((task) => (
                                                        <div
                                                            key={task.id}
                                                            className={`text-xs p-2 rounded-md ${getPriorityColor(task.priority)} hover:opacity-80`}
                                                        >
                                                            <div className="font-medium truncate">{task.title}</div>
                                                            {task.time && (
                                                                <div className="flex items-center mt-1">
                                                                    <Clock className="h-3 w-3 mr-1"/>
                                                                    {task.time}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-xs text-muted-foreground">
                                                        No tasks
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                );
            case "day":
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {date ? format(date, 'EEEE, MMMM d, yyyy') : ""}
                            </CardTitle>
                            <CardDescription>
                                Daily schedule
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {/* Time slots from 8 AM to 6 PM */}
                                {Array.from({length: 11}, (_, i) => i + 8).map((hour) => {
                                    const hourTasks = selectedTasks.filter(task => {
                                        const taskHour = task.date.getHours();
                                        return taskHour === hour;
                                    });

                                    return (
                                        <div key={hour} className="flex">
                                            <div className="w-20 py-3 text-sm text-muted-foreground">
                                                {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                                            </div>
                                            <div className="flex-1 border-t pt-3">
                                                {hourTasks.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {hourTasks.map(task => (
                                                            <div
                                                                key={task.id}
                                                                className={`p-2 rounded-md ${getPriorityColor(task.priority)}`}
                                                            >
                                                                <div className="flex justify-between">
                                                                    <span className="font-medium">{task.title}</span>
                                                                    <span>{task.time}</span>
                                                                </div>
                                                                {task.description && (
                                                                    <p className="text-sm mt-1">{task.description}</p>
                                                                )}
                                                                <div className="mt-2 flex items-center gap-2">
                                                                    <Avatar className="h-6 w-6">
                                                                        <AvatarImage
                                                                            src={task.assignee.avatar || ""}
                                                                            alt={task.assignee.name}
                                                                        />
                                                                        <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                                                                    </Avatar>
                                                                    <span
                                                                        className="text-xs">{task.assignee.name}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="h-8 border border-dashed rounded-md border-muted-foreground/20"></div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
                    <TabsList>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="day">Day</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex flex-wrap gap-2">
                    <Select value={projectFilter} onValueChange={setProjectFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter by project"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Projects</SelectItem>
                            {projects.map((project) => (
                                <SelectItem key={project} value={project}>{project}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter by priority"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowCompleted(!showCompleted)}
                        className={showCompleted ? "bg-primary/10" : ""}
                    >
                        <CheckCircle className="h-4 w-4"/>
                    </Button>
                </div>
            </div>

            {renderCalendarContent()}

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Tasks scheduled for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredTasks
                            .filter(task => task.date <= addDays(new Date(), 7) && task.date >= startOfDay(new Date()))
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map(task => (
                                <div key={task.id}
                                     className="flex items-center justify-between p-3 border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-12 rounded-sm ${getPriorityColor(task.priority)}`}/>
                                        <div>
                                            <p className="font-medium">{task.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {format(task.date, 'EEE, MMM d')} · {task.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">{task.project}</Badge>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage
                                                src={task.assignee.avatar || ""}
                                                alt={task.assignee.name}
                                            />
                                            <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50">
                    <div className="w-full flex justify-center">
                        <Button variant="outline" size="sm" onClick={() => onDateSelect?.()}>
                            <Plus className="h-4 w-4 mr-1"/>
                            Add Task
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default TaskCalendar;