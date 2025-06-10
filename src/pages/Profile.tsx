import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Camera, MapPin, Calendar, Mail} from "lucide-react";

const Profile = () => {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        name: "Farzad Asgari",
        email: "khufarzadasgari@gmail.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        bio: "Passionate Researcher",
        joinDate: "January 2022",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProfileData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully.",
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <PageLayout
            title="Profile"
            subtitle="View and edit your personal information"
        >
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Manage your profile details and public information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage src="/placeholder.svg"/>
                                    <AvatarFallback className="text-2xl">FA</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm">
                                    <Camera className="h-4 w-4 mr-2"/>
                                    Change Photo
                                </Button>
                            </div>

                            {/* Form Section */}
                            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                    />
                                </div>

                                <Button type="submit" disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-muted-foreground"/>
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-muted-foreground"/>
                                <div>
                                    <p className="text-sm font-medium">Location</p>
                                    <p className="text-sm text-muted-foreground">{profileData.location}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-muted-foreground"/>
                                <div>
                                    <p className="text-sm font-medium">Joined</p>
                                    <p className="text-sm text-muted-foreground">{profileData.joinDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default Profile;
