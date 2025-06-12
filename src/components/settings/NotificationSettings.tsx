import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {Bell, Mail, MessageSquare, Calendar, Activity} from "lucide-react";

export function NotificationSettings() {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState({
        emailDigest: true,
        emailTaskAssigned: true,
        emailComments: false,
        emailReminders: true,
        pushNewTasks: true,
        pushStatusChanges: true,
        pushComments: true,
        pushDueDates: true,
        desktopNotifications: false,
        soundAlerts: false
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = () => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Notification settings saved",
                description: "Your notification preferences have been updated successfully.",
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5"/>
                        Email Notifications
                    </CardTitle>
                    <CardDescription>
                        Configure how and when you receive email notifications
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-digest">Daily digest</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive a summary of activities at the end of each day
                                </p>
                            </div>
                            <Switch
                                id="email-digest"
                                checked={settings.emailDigest}
                                onCheckedChange={() => handleToggle('emailDigest')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-tasks">Task assignments</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get notified when tasks are assigned to you
                                </p>
                            </div>
                            <Switch
                                id="email-tasks"
                                checked={settings.emailTaskAssigned}
                                onCheckedChange={() => handleToggle('emailTaskAssigned')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-comments">Comments</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails when someone comments on your tasks
                                </p>
                            </div>
                            <Switch
                                id="email-comments"
                                checked={settings.emailComments}
                                onCheckedChange={() => handleToggle('emailComments')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-reminders">Due date reminders</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get reminders before task due dates
                                </p>
                            </div>
                            <Switch
                                id="email-reminders"
                                checked={settings.emailReminders}
                                onCheckedChange={() => handleToggle('emailReminders')}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5"/>
                        In-App Notifications
                    </CardTitle>
                    <CardDescription>
                        Manage notifications within the application
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-new-tasks">New tasks</Label>
                                <p className="text-sm text-muted-foreground">
                                    Show notifications for newly created tasks
                                </p>
                            </div>
                            <Switch
                                id="push-new-tasks"
                                checked={settings.pushNewTasks}
                                onCheckedChange={() => handleToggle('pushNewTasks')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-status">Status changes</Label>
                                <p className="text-sm text-muted-foreground">
                                    Notify when task statuses are updated
                                </p>
                            </div>
                            <Switch
                                id="push-status"
                                checked={settings.pushStatusChanges}
                                onCheckedChange={() => handleToggle('pushStatusChanges')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-comments">Comments</Label>
                                <p className="text-sm text-muted-foreground">
                                    Show notifications for new comments
                                </p>
                            </div>
                            <Switch
                                id="push-comments"
                                checked={settings.pushComments}
                                onCheckedChange={() => handleToggle('pushComments')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-due-dates">Due date alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                    Remind you of approaching due dates
                                </p>
                            </div>
                            <Switch
                                id="push-due-dates"
                                checked={settings.pushDueDates}
                                onCheckedChange={() => handleToggle('pushDueDates')}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5"/>
                        Additional Settings
                    </CardTitle>
                    <CardDescription>
                        Configure other notification preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="desktop-notifications">Browser notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Show desktop notifications when browser is open
                                </p>
                            </div>
                            <Switch
                                id="desktop-notifications"
                                checked={settings.desktopNotifications}
                                onCheckedChange={() => handleToggle('desktopNotifications')}
                            />
                        </div>

                        <Separator/>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="sound-alerts">Sound alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                    Play a sound when important notifications arrive
                                </p>
                            </div>
                            <Switch
                                id="sound-alerts"
                                checked={settings.soundAlerts}
                                onCheckedChange={() => handleToggle('soundAlerts')}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Preferences"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default NotificationSettings;