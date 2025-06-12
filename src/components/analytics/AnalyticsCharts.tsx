import {useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    BarChart as RechartsBarChart,
    Bar,
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const taskCompletionData = [
    {name: "Mon", completed: 5, pending: 2},
    {name: "Tue", completed: 8, pending: 3},
    {name: "Wed", completed: 6, pending: 4},
    {name: "Thu", completed: 9, pending: 1},
    {name: "Fri", completed: 4, pending: 7},
    {name: "Sat", completed: 3, pending: 2},
    {name: "Sun", completed: 2, pending: 1},
];

const productivityData = [
    {date: "Week 1", productivity: 72, industry: 68},
    {date: "Week 2", productivity: 78, industry: 69},
    {date: "Week 3", productivity: 65, industry: 70},
    {date: "Week 4", productivity: 82, industry: 71},
    {date: "Week 5", productivity: 75, industry: 72},
    {date: "Week 6", productivity: 90, industry: 72},
];

const projectProgressData = [
    {name: "Website Redesign", completed: 75, total: 100},
    {name: "Mobile App", completed: 45, total: 100},
    {name: "Backend API", completed: 90, total: 100},
    {name: "Marketing Site", completed: 30, total: 100},
];

const priorityDistributionData = [
    {name: "Low", value: 15, color: "#8FCCBB"},
    {name: "Medium", value: 25, color: "#F8BB54"},
    {name: "High", value: 35, color: "#F97316"},
    {name: "Urgent", value: 25, color: "#EA384C"},
];

const timeSpentData = [
    {name: "Development", hours: 28, percentage: 35},
    {name: "Design", hours: 16, percentage: 20},
    {name: "Planning", hours: 12, percentage: 15},
    {name: "Testing", hours: 10, percentage: 13},
    {name: "Meetings", hours: 8, percentage: 10},
    {name: "Other", hours: 6, percentage: 7},
];

const burndownData = [
    {day: 1, ideal: 100, remaining: 100},
    {day: 2, ideal: 95, remaining: 98},
    {day: 3, ideal: 90, remaining: 94},
    {day: 4, ideal: 85, remaining: 91},
    {day: 5, ideal: 80, remaining: 88},
    {day: 6, ideal: 75, remaining: 85},
    {day: 7, ideal: 70, remaining: 84},
    {day: 8, ideal: 65, remaining: 83},
    {day: 9, ideal: 60, remaining: 77},
    {day: 10, ideal: 55, remaining: 72},
    {day: 11, ideal: 50, remaining: 65},
    {day: 12, ideal: 45, remaining: 58},
    {day: 13, ideal: 40, remaining: 52},
    {day: 14, ideal: 35, remaining: 48},
    {day: 15, ideal: 30, remaining: 42},
    {day: 16, ideal: 25, remaining: 38},
    {day: 17, ideal: 20, remaining: 30},
    {day: 18, ideal: 15, remaining: 22},
    {day: 19, ideal: 10, remaining: 15},
    {day: 20, ideal: 5, remaining: 8},
    {day: 21, ideal: 0, remaining: 0},
];

const monthlyTrendData = [
    {month: "Jan", tasks: 45, efficiency: 72},
    {month: "Feb", tasks: 52, efficiency: 75},
    {month: "Mar", tasks: 48, efficiency: 78},
    {month: "Apr", tasks: 61, efficiency: 80},
    {month: "May", tasks: 55, efficiency: 83},
    {month: "Jun", tasks: 67, efficiency: 85},
    {month: "Jul", tasks: 78, efficiency: 82},
    {month: "Aug", tasks: 71, efficiency: 81},
    {month: "Sep", tasks: 65, efficiency: 79},
    {month: "Oct", tasks: 72, efficiency: 82},
    {month: "Nov", tasks: 80, efficiency: 85},
    {month: "Dec", tasks: 68, efficiency: 84},
];

export function AnalyticsCharts() {
    const [chartView, setChartView] = useState<"tasks" | "time" | "trends">("tasks");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Tabs defaultValue={chartView} onValueChange={(value) => setChartView(value as any)}>
                    <TabsList className="mb-4">
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="time">Time Management</TabsTrigger>
                        <TabsTrigger value="trends">Trends</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex gap-2">
                    <Select defaultValue="week">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Period"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                            <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm">
                        Export
                    </Button>
                </div>
            </div>

            <TabsContent value="tasks" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Completion</CardTitle>
                            <CardDescription>
                                Completed vs pending tasks over the last week
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsBarChart data={taskCompletionData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="completed" name="Completed" fill="#86EFAC"/>
                                    <Bar dataKey="pending" name="Pending" fill="#FCA5A5"/>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Priority Distribution</CardTitle>
                            <CardDescription>
                                Current distribution of tasks by priority
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={priorityDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        nameKey="name"
                                        label={(entry) => entry.name}
                                        labelLine={true}
                                    >
                                        {priorityDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color}/>
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']}/>
                                    <Legend/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Project Progress</CardTitle>
                        <CardDescription>Completion percentage by project</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <RechartsBarChart
                                layout="vertical"
                                data={projectProgressData}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis type="number" domain={[0, 100]}/>
                                <YAxis type="category" dataKey="name" width={150}/>
                                <Tooltip/>
                                <Legend/>
                                <Bar
                                    dataKey="completed"
                                    name="Completion (%)"
                                    fill="#6366f1"
                                    radius={[0, 4, 4, 0]}
                                />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="time" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Allocation</CardTitle>
                            <CardDescription>
                                How time is distributed across different activities
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={timeSpentData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="hours"
                                        nameKey="name"
                                        label={({name, percentage}) => `${name}: ${percentage}%`}
                                        labelLine={true}
                                    >
                                        {timeSpentData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={[
                                                    "#4f46e5",
                                                    "#8b5cf6",
                                                    "#ec4899",
                                                    "#f97316",
                                                    "#eab308",
                                                    "#6b7280"
                                                ][index]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${value} hours`, 'Time Spent']}/>
                                    <Legend/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sprint Burndown</CardTitle>
                            <CardDescription>
                                Tracking task completion against ideal progress
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsLineChart data={burndownData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="day"/>
                                    <YAxis domain={[0, 100]}/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line
                                        type="monotone"
                                        dataKey="ideal"
                                        name="Ideal Burndown"
                                        stroke="#94a3b8"
                                        strokeDasharray="5 5"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="remaining"
                                        name="Actual Remaining"
                                        stroke="#f43f5e"
                                        activeDot={{r: 8}}
                                    />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Team Productivity Trend</CardTitle>
                        <CardDescription>
                            Productivity score over the last 6 weeks compared to industry average
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <RechartsLineChart data={productivityData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis domain={[0, 100]}/>
                                <Tooltip/>
                                <Legend/>
                                <Line
                                    type="monotone"
                                    dataKey="productivity"
                                    name="Your Team"
                                    stroke="#8884d8"
                                    strokeWidth={3}
                                    activeDot={{r: 8}}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="industry"
                                    name="Industry Average"
                                    stroke="#82ca9d"
                                    strokeDasharray="5 5"
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Yearly Performance</CardTitle>
                        <CardDescription>Task completion and efficiency trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <RechartsLineChart data={monthlyTrendData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="month"/>
                                <YAxis yAxisId="left"/>
                                <YAxis yAxisId="right" orientation="right" domain={[0, 100]}/>
                                <Tooltip/>
                                <Legend/>
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="tasks"
                                    name="Tasks Completed"
                                    stroke="#8884d8"
                                    activeDot={{r: 8}}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="efficiency"
                                    name="Efficiency Score"
                                    stroke="#82ca9d"
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Completion Timeline</CardTitle>
                            <CardDescription>
                                Number of tasks completed over time
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={monthlyTrendData}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="month"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area
                                        type="monotone"
                                        dataKey="tasks"
                                        name="Tasks"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Task Efficiency</CardTitle>
                            <CardDescription>
                                Monthly efficiency metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={monthlyTrendData}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="month"/>
                                    <YAxis domain={[0, 100]}/>
                                    <Tooltip/>
                                    <Area
                                        type="monotone"
                                        dataKey="efficiency"
                                        name="Efficiency"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        fillOpacity={0.3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </div>
    );
}

export default AnalyticsCharts;