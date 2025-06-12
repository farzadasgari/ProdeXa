import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AccountSettings from "@/components/settings/AccountSettings";
const validTabs = ['profile', 'account', 'notifications', 'api'] as const;
type TabValue = typeof validTabs[number];

const Settings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabValue>("profile");
    const [mounted, setMounted] = useState(false);

    // Parse URL query parameters to set active tab
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabParam = searchParams.get('tab') as TabValue | null;

        if (tabParam && validTabs.includes(tabParam)) {
            setActiveTab(tabParam);
        }

        // Ensure component is mounted before rendering tabs
        setMounted(true);
    }, [location.search]);

    // Update URL when tab changes
    const handleTabChange = (value: string) => {
        const newTab = value as TabValue;
        setActiveTab(newTab);

        const searchParams = new URLSearchParams(location.search);
        searchParams.set('tab', newTab);
        navigate(`${location.pathname}?${searchParams.toString()}`, {replace: true});
    };

    // Make sure we always have a valid tab selected
    const currentTab: TabValue = validTabs.includes(activeTab) ? activeTab : "profile";

    if (!mounted) {
        return (
            <PageLayout title="Settings" subtitle="Manage your account and preferences">
                <div className="w-full flex justify-center items-center py-8">
                    <p>Loading settings...</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout
            title="Settings"
            subtitle="Manage your account and preferences"
        >
            <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full" defaultValue="profile">
                <TabsList className="mb-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    {/*<ProfileSettings />*/}
                </TabsContent>

                <TabsContent value="account">
                    <AccountSettings />
                </TabsContent>

                <TabsContent value="notifications">
                    {/*<NotificationSettings />*/}
                </TabsContent>

                <TabsContent value="api">
                    {/*<ApiSettings />*/}
                </TabsContent>
            </Tabs>
        </PageLayout>
    );
};

export default Settings;
