import {useState} from "react";
import PageLayout from "@/components/layout/PageLayout";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ChartLine, CalendarClock, Clock, Users, Calendar, TrendingUp, Target, Activity} from "lucide-react";

const Analytics = () => {
    const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
    const [activeTab, setActiveTab] = useState("overview");

    const dateRangeOptions = [
        {value: "7d", label: "7 days"},
        {value: "30d", label: "30 days"},
        {value: "90d", label: "90 days"},
        {value: "1y", label: "1 year"},
    ];

    return (
        <PageLayout
            title="Analytics & Insights"
            subtitle="Comprehensive performance metrics and productivity analysis"
        >
            {/* Header Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <Activity className="h-4 w-4"/>
                            <span className="hidden sm:inline">Overview</span>
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="flex items-center gap-2">
                            <Target className="h-4 w-4"/>
                            <span className="hidden sm:inline">Tasks</span>
                        </TabsTrigger>
                        <TabsTrigger value="productivity" className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4"/>
                            <span className="hidden sm:inline">Productivity</span>
                        </TabsTrigger>
                        <TabsTrigger value="team" className="flex items-center gap-2">
                            <Users className="h-4 w-4"/>
                            <span className="hidden sm:inline">Team</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Select value={dateRange} onValueChange={(value) => setDateRange(value as any)}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {dateRangeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    Last {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Tab Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="overview" className="space-y-6">
                    {/* Key Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-l-4 border-l-green-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardDescription className="text-sm font-medium">Tasks Completed</CardDescription>
                                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                        <Target className="h-4 w-4 text-green-600 dark:text-green-400"/>
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-bold">124</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm">
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1"/>
                                    <span className="text-green-600 dark:text-green-400 font-medium">+12%</span>
                                    <span className="text-muted-foreground ml-1">vs last period</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardDescription className="text-sm font-medium">Avg Completion
                                        Time</CardDescription>
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-bold">3.2 days</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm">
                                    <TrendingUp className="h-4 w-4 text-red-500 mr-1 rotate-180"/>
                                    <span className="text-red-600 dark:text-red-400 font-medium">+5%</span>
                                    <span className="text-muted-foreground ml-1">slower</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-purple-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardDescription className="text-sm font-medium">Productivity
                                        Score</CardDescription>
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                        <Activity className="h-4 w-4 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-bold">86%</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm">
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1"/>
                                    <span className="text-green-600 dark:text-green-400 font-medium">+4%</span>
                                    <span className="text-muted-foreground ml-1">improvement</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-orange-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardDescription className="text-sm font-medium">On-Time Delivery</CardDescription>
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                        <CalendarClock className="h-4 w-4 text-orange-600 dark:text-orange-400"/>
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-bold">92%</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm">
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1"/>
                                    <span className="text-green-600 dark:text-green-400 font-medium">+8%</span>
                                    <span className="text-muted-foreground ml-1">better</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Charts */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <Card className="xl:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ChartLine className="h-5 w-5"/>
                                    Performance Overview
                                </CardTitle>
                                <CardDescription>Key metrics visualization for the selected period</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] overflow-auto"> {/* Added overflow-auto to handle overflow */}
                                    <AnalyticsCharts dateRange={dateRange} activeTab="overview"/>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5"/>
                                    Team Performance
                                </CardTitle>
                                <CardDescription>Individual team member metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: "John Doe",
                                            role: "Team Lead",
                                            tasks: 12,
                                            completion: 75,
                                            color: "bg-blue-500"
                                        },
                                        {
                                            name: "Sarah Lee",
                                            role: "Designer",
                                            tasks: 8,
                                            completion: 50,
                                            color: "bg-purple-500"
                                        },
                                        {
                                            name: "Mike Johnson",
                                            role: "Developer",
                                            tasks: 15,
                                            completion: 83,
                                            color: "bg-green-500"
                                        },
                                        {
                                            name: "Alice Smith",
                                            role: "QA Engineer",
                                            tasks: 7,
                                            completion: 33,
                                            color: "bg-orange-500"
                                        },
                                    ].map((member) => (
                                        <div key={member.name} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-10 w-10 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-medium`}>
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{member.name}</p>
                                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">{member.tasks} tasks</p>
                                                    <p className="text-xs text-muted-foreground">{member.completion}%
                                                        complete</p>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${member.color} rounded-full transition-all duration-300`}
                                                    style={{width: `${member.completion}%`}}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="tasks" className="space-y-6">
                    <AnalyticsCharts dateRange={dateRange} activeTab="tasks"/>
                </TabsContent>

                <TabsContent value="productivity" className="space-y-6">
                    <AnalyticsCharts dateRange={dateRange} activeTab="productivity"/>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                    <AnalyticsCharts dateRange={dateRange} activeTab="team"/>
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
};

export default Analytics;