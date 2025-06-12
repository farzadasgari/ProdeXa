import {useState} from "react";
import PageLayout from "@/components/layout/PageLayout";
import TaskCalendar from "@/components/calendar/TaskCalendar";
import {AddTaskModal} from "@/components/calendar/ModalCalendar";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Plus, Calendar as CalendarIcon, Filter} from "lucide-react";

const CalendarPage = () => {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [viewMode, setViewMode] = useState("month");
    const [filterBy, setFilterBy] = useState("all");

    const handleAddTask = (date?: Date) => {
        setSelectedDate(date);
        setIsAddTaskModalOpen(true);
    };

    return (
        <PageLayout
            title="Calendar"
            subtitle="View and manage scheduled tasks and events"
        >
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => handleAddTask()}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4"/>
                        Add Task
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => handleAddTask(new Date())}
                        className="flex items-center gap-2"
                    >
                        <CalendarIcon className="h-4 w-4"/>
                        Quick Add Today
                    </Button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Select value={viewMode} onValueChange={setViewMode}>
                        <SelectTrigger className="w-full sm:w-[130px]">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="month">Month View</SelectItem>
                            <SelectItem value="week">Week View</SelectItem>
                            <SelectItem value="day">Day View</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filterBy} onValueChange={setFilterBy}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                            <Filter className="h-4 w-4 mr-2"/>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Tasks</SelectItem>
                            <SelectItem value="my-tasks">My Tasks</SelectItem>
                            <SelectItem value="team-tasks">Team Tasks</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Calendar Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <Card>
                        <CardContent className="p-6">
                            <TaskCalendar onDateSelect={handleAddTask}/>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar with Quick Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Today's Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                {title: "Team Meeting", time: "09:00 AM", priority: "high"},
                                {title: "Code Review", time: "02:00 PM", priority: "medium"},
                                {title: "Project Planning", time: "04:30 PM", priority: "low"},
                            ].map((task, index) => (
                                <div key={index}
                                     className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">{task.title}</p>
                                        <p className="text-xs text-muted-foreground">{task.time}</p>
                                    </div>
                                    <div className={`h-2 w-2 rounded-full ${
                                        task.priority === 'high' ? 'bg-red-500' :
                                            task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}/>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                {title: "Website Launch", date: "Tomorrow", urgent: true},
                                {title: "Client Presentation", date: "Dec 15", urgent: false},
                                {title: "Sprint Review", date: "Dec 18", urgent: false},
                            ].map((deadline, index) => (
                                <div key={index}
                                     className={`p-3 rounded-lg border ${deadline.urgent ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : 'border-border bg-background'}`}>
                                    <p className="text-sm font-medium">{deadline.title}</p>
                                    <p className={`text-xs ${deadline.urgent ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
                                        {deadline.date}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Add Task Modal */}
            <AddTaskModal
                open={isAddTaskModalOpen}
                onOpenChange={setIsAddTaskModalOpen}
                selectedDate={selectedDate}
            />
        </PageLayout>
    );
};

export default CalendarPage;