import {Clock, CheckSquare, AlertCircle, FolderOpen} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import StatCard from "@/components/master/StatCard";
import ActivityFeed from "@/components/master/ActivityFeed";
import {Progress} from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const weeklyTasksData = [
    {
        day: "Mon",
        completed: 5,
        total: 8,
    },
    {
        day: "Tue",
        completed: 7,
        total: 10,
    },
    {
        day: "Wed",
        completed: 4,
        total: 6,
    },
    {
        day: "Thu",
        completed: 6,
        total: 9,
    },
    {
        day: "Fri",
        completed: 8,
        total: 12,
    },
    {
        day: "Sat",
        completed: 3,
        total: 5,
    },
    {
        day: "Sun",
        completed: 2,
        total: 3,
    },
];

const Master = () => {
    return (
        <PageLayout
            title="Dashboard"
            subtitle="Overview of your tasks and projects"
        >
            {/* Task summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Tasks Due Today"
                    value="5"
                    description="2 high priority"
                    icon={<Clock size={18}/>}
                    trend={{value: 10, isPositive: false}}
                    footer="3 more than yesterday"
                />
                <StatCard
                    title="Completed This Week"
                    value="27"
                    description="Out of 42 tasks"
                    icon={<CheckSquare size={18}/>}
                    trend={{value: 15, isPositive: true}}
                    footer="64% completion rate"
                />
                <StatCard
                    title="Overdue Tasks"
                    value="8"
                    description="Across 3 projects"
                    icon={<AlertCircle size={18}/>}
                    trend={{value: 5, isPositive: false}}
                    footer="Increased by 2 since yesterday"
                />
                <StatCard
                    title="Active Projects"
                    value="12"
                    description="3 due this month"
                    icon={<FolderOpen size={18}/>}
                    footer="8 on track, 4 at risk"
                />
            </div>

            {/* Current sprint progress */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Current Sprint Progress</CardTitle>
                    <CardDescription>May 15 - May 29, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Sprint #24: Website Redesign</p>
                                <p className="text-xs text-muted-foreground">14 days remaining</p>
                            </div>
                            <p className="text-sm font-medium">65%</p>
                        </div>
                        <Progress value={65} className="h-2"/>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div className="flex items-center justify-center gap-2 p-2 bg-muted/50 rounded">
                                <div className="h-3 w-3 rounded-full bg-green-400"/>
                                <span className="text-sm">18 Completed</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 p-2 bg-muted/50 rounded">
                                <div className="h-3 w-3 rounded-full bg-blue-400"/>
                                <span className="text-sm">7 In Progress</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 p-2 bg-muted/50 rounded">
                                <div className="h-3 w-3 rounded-full bg-gray-400"/>
                                <span className="text-sm">5 To Do</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly task graph and activity feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Task Completion</CardTitle>
                        <CardDescription>Tasks completed vs. total tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={weeklyTasksData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="day"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="completed" name="Completed" fill="#8884d8"/>
                                    <Bar dataKey="total" name="Total" fill="#82ca9d"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <ActivityFeed/>
            </div>
        </PageLayout>
    );
};

export default Master;
