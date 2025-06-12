import {useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

interface AnalyticsChartsProps {
    dateRange?: string;
    activeTab?: string;
}

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

export function AnalyticsCharts({dateRange = "30d", activeTab = "overview"}: AnalyticsChartsProps) {

    if (activeTab === "overview") {
        return (
            <ResponsiveContainer width="100%" height="100%">
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
                        strokeWidth={3}
                        activeDot={{r: 8}}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="efficiency"
                        name="Efficiency Score"
                        stroke="#82ca9d"
                        strokeWidth={2}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        );
    }

    if (activeTab === "tasks") {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Task Completion</CardTitle>
                        <CardDescription>Tasks completed vs pending over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart data={taskCompletionData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="completed" name="Completed" fill="#22c55e"/>
                                <Bar dataKey="pending" name="Pending" fill="#ef4444"/>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Priority Distribution</CardTitle>
                        <CardDescription>Current task breakdown by priority level</CardDescription>
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
                                    label={({name, value}) => `${name}: ${value}%`}
                                >
                                    {priorityDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Project Progress Overview</CardTitle>
                        <CardDescription>Completion status across all active projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart layout="vertical" data={projectProgressData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis type="number" domain={[0, 100]}/>
                                <YAxis type="category" dataKey="name" width={150}/>
                                <Tooltip formatter={(value) => [`${value}%`, 'Progress']}/>
                                <Bar dataKey="completed" fill="#3b82f6" radius={[0, 4, 4, 0]}/>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (activeTab === "productivity") {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Productivity Trend</CardTitle>
                        <CardDescription>Your team vs industry benchmark</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsLineChart data={productivityData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis domain={[0, 100]}/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="productivity" name="Your Team" stroke="#8b5cf6"
                                      strokeWidth={3}/>
                                <Line type="monotone" dataKey="industry" name="Industry Avg" stroke="#64748b"
                                      strokeDasharray="5 5"/>
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Time Allocation</CardTitle>
                        <CardDescription>How time is distributed across activities</CardDescription>
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

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sprint Burndown Chart</CardTitle>
                        <CardDescription>Tracking task completion against ideal progress</CardDescription>
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
                                    strokeWidth={3}
                                    activeDot={{r: 8}}
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (activeTab === "team") {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Team Task Distribution</CardTitle>
                        <CardDescription>Tasks assigned per team member</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart data={[
                                {name: "John Doe", tasks: 12, completed: 9},
                                {name: "Sarah Lee", tasks: 8, completed: 4},
                                {name: "Mike Johnson", tasks: 15, completed: 12},
                                {name: "Alice Smith", tasks: 7, completed: 2},
                            ]}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="tasks" name="Total Tasks" fill="#e2e8f0"/>
                                <Bar dataKey="completed" name="Completed" fill="#22c55e"/>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Team Efficiency Trend</CardTitle>
                        <CardDescription>Monthly efficiency by team members</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsLineChart data={[
                                {month: "Jan", john: 85, sarah: 78, mike: 92, alice: 70},
                                {month: "Feb", john: 88, sarah: 82, mike: 94, alice: 75},
                                {month: "Mar", john: 92, sarah: 85, mike: 89, alice: 80},
                                {month: "Apr", john: 90, sarah: 88, mike: 96, alice: 78},
                            ]}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="month"/>
                                <YAxis domain={[0, 100]}/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="john" name="John" stroke="#3b82f6"/>
                                <Line type="monotone" dataKey="sarah" name="Sarah" stroke="#8b5cf6"/>
                                <Line type="monotone" dataKey="mike" name="Mike" stroke="#22c55e"/>
                                <Line type="monotone" dataKey="alice" name="Alice" stroke="#f97316"/>
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Team Workload Balance</CardTitle>
                        <CardDescription>Current workload distribution across team members</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={[
                                {week: "Week 1", john: 40, sarah: 30, mike: 45, alice: 25},
                                {week: "Week 2", john: 42, sarah: 32, mike: 48, alice: 28},
                                {week: "Week 3", john: 38, sarah: 35, mike: 50, alice: 30},
                                {week: "Week 4", john: 45, sarah: 28, mike: 42, alice: 32},
                            ]}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="week"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Area type="monotone" dataKey="john" stackId="1" stroke="#3b82f6" fill="#3b82f6"
                                      fillOpacity={0.6}/>
                                <Area type="monotone" dataKey="sarah" stackId="1" stroke="#8b5cf6" fill="#8b5cf6"
                                      fillOpacity={0.6}/>
                                <Area type="monotone" dataKey="mike" stackId="1" stroke="#22c55e" fill="#22c55e"
                                      fillOpacity={0.6}/>
                                <Area type="monotone" dataKey="alice" stackId="1" stroke="#f97316" fill="#f97316"
                                      fillOpacity={0.6}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
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
                    strokeWidth={3}
                    activeDot={{r: 8}}
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    name="Efficiency Score"
                    stroke="#82ca9d"
                    strokeWidth={2}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}

export default AnalyticsCharts;
