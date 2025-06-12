import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Switch} from "@/components/ui/switch";
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ProfileSettings() {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "Farzad Asgari",
        email: "khufarzadasgari@gmail.com",
        bio: "Developer with 15 years of experience",
        timezone: "America/New_York",
        emailNotifications: true,
        browserNotifications: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({...prev, [name]: checked}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                        Manage your account information and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src="/placeholder.svg"/>
                                    <AvatarFallback>FA</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" size="sm">
                                        Change avatar
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        JPG, GIF or PNG. Max size 1MB.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Brief description for your profile.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select
                                        value={formData.timezone}
                                        onValueChange={(value) => handleSelectChange("timezone", value)}
                                    >
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select timezone"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                                            <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                                            <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                                            <SelectItem value="America/Los_Angeles">Pacific Time (US &
                                                Canada)</SelectItem>
                                            <SelectItem value="Europe/London">London</SelectItem>
                                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                                            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <Separator/>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Notification Settings</h3>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="email-notifications" className="text-sm font-medium">
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about task assignments and updates
                                    </p>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    checked={formData.emailNotifications}
                                    onCheckedChange={(checked) =>
                                        handleSwitchChange("emailNotifications", checked)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="browser-notifications" className="text-sm font-medium">
                                        Browser Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show desktop notifications for important events
                                    </p>
                                </div>
                                <Switch
                                    id="browser-notifications"
                                    checked={formData.browserNotifications}
                                    onCheckedChange={(checked) =>
                                        handleSwitchChange("browserNotifications", checked)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>API Token Management</CardTitle>
                    <CardDescription>
                        Generate and manage API tokens for external integrations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Personal Access Token</p>
                                <p className="text-sm text-muted-foreground">
                                    Used for personal API access
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    toast({
                                        title: "Token generated",
                                        description: "A new token has been created",
                                    })
                                }
                            >
                                Generate Token
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">OAuth2 Client</p>
                                <p className="text-sm text-muted-foreground">
                                    For third-party application integration
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    toast({
                                        title: "OAuth client created",
                                        description: "New OAuth client credentials generated",
                                    })
                                }
                            >
                                Create Client
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProfileSettings;