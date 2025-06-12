import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Code, Copy, MoreHorizontal, RefreshCcw, CheckCircle} from "lucide-react";

export function ApiSettings() {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);
    const [showToken, setShowToken] = useState(false);
    const [openTokenDialog, setOpenTokenDialog] = useState(false);
    const [tokenName, setTokenName] = useState("");
    const [tokenScope, setTokenScope] = useState("read");

    // Simulated API tokens
    const [apiTokens, setApiTokens] = useState([
        {
            id: "1",
            name: "Dashboard Integration",
            token: "sk_test_••••••••••••••••••••••••••••••",
            createdAt: "2025-02-15T10:00:00Z",
            lastUsed: "2025-05-10T15:30:00Z",
            scope: "read",
            active: true
        },
        {
            id: "2",
            name: "Mobile App",
            token: "sk_test_••••••••••••••••••••••••••••••",
            createdAt: "2025-03-20T14:25:00Z",
            lastUsed: "2025-05-09T09:45:00Z",
            scope: "read-write",
            active: true
        }
    ]);

    const handleCopyToken = (token: string) => {
        navigator.clipboard.writeText(token).then(() => {
            toast({
                title: "Token copied",
                description: "API token has been copied to clipboard",
            });
        });
    };

    const handleCreateToken = () => {
        if (!tokenName) {
            toast({
                title: "Error",
                description: "Please provide a name for your token",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newToken = {
                id: Math.random().toString(36).substring(7),
                name: tokenName,
                token: "sk_test_" + Array(32).fill(0).map(() => Math.random().toString(36).charAt(2)).join(''),
                createdAt: new Date().toISOString(),
                lastUsed: null,
                scope: tokenScope,
                active: true
            };

            setApiTokens([newToken, ...apiTokens]);
            setOpenTokenDialog(false);
            setTokenName("");
            setTokenScope("read");
            setShowToken(true);

            toast({
                title: "Token created",
                description: "Your new API token has been created successfully",
            });

            setLoading(false);
        }, 1000);
    };

    const handleRevokeToken = (id: string) => {
        setApiTokens(apiTokens.map(token =>
            token.id === id ? {...token, active: false} : token
        ));

        toast({
            title: "Token revoked",
            description: "API token has been revoked successfully",
        });
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Never";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5"/>
                        API Access
                    </CardTitle>
                    <CardDescription>
                        Manage your API tokens for external integrations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert className="mb-6">
                        <CheckCircle className="h-4 w-4"/>
                        <AlertTitle>Use your API tokens securely</AlertTitle>
                        <AlertDescription>
                            API tokens provide complete access to your account through the API. Keep your tokens secure
                            and never share them in client-side code or public repositories.
                        </AlertDescription>
                    </Alert>

                    <div className="mb-6">
                        <Dialog open={openTokenDialog} onOpenChange={setOpenTokenDialog}>
                            <DialogTrigger asChild>
                                <Button>
                                    Create New Token
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create API Token</DialogTitle>
                                    <DialogDescription>
                                        Generate a new API token for external integrations.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="token-name" className="col-span-4">
                                            Token Name
                                        </Label>
                                        <Input
                                            id="token-name"
                                            placeholder="My Integration"
                                            className="col-span-4"
                                            value={tokenName}
                                            onChange={(e) => setTokenName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="token-scope" className="col-span-4">
                                            Access Scope
                                        </Label>
                                        <Select
                                            value={tokenScope}
                                            onValueChange={setTokenScope}
                                        >
                                            <SelectTrigger className="col-span-4">
                                                <SelectValue placeholder="Select scope"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="read">Read only</SelectItem>
                                                <SelectItem value="read-write">Read & Write</SelectItem>
                                                <SelectItem value="admin">Full admin access</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setOpenTokenDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateToken} disabled={loading}>
                                        {loading ? "Creating..." : "Create Token"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Last Used</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {apiTokens.map((token) => (
                                    <TableRow key={token.id}>
                                        <TableCell className="font-medium">{token.name}</TableCell>
                                        <TableCell>{formatDate(token.lastUsed)}</TableCell>
                                        <TableCell>{formatDate(token.createdAt)}</TableCell>
                                        <TableCell>
                                            {token.active ? (
                                                <span
                                                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                                            ) : (
                                                <span
                                                    className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          Revoked
                        </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => handleCopyToken(token.token)}
                                                        className="cursor-pointer"
                                                    >
                                                        <Copy className="mr-2 h-4 w-4"/>
                                                        Copy
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator/>
                                                    {token.active && (
                                                        <DropdownMenuItem
                                                            onClick={() => handleRevokeToken(token.id)}
                                                            className="text-red-600 cursor-pointer"
                                                        >
                                                            Revoke
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {apiTokens.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No API tokens found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>
                        Configure webhook endpoints for real-time event notifications
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="webhook-url">Webhook URL</Label>
                                <div className="flex mt-1">
                                    <Input
                                        id="webhook-url"
                                        placeholder="https://example.com/webhook"
                                        className="flex-1 rounded-r-none"
                                    />
                                    <Button className="rounded-l-none">
                                        Save
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    The endpoint that will receive webhook events
                                </p>
                            </div>
                        </div>

                        <Separator className="my-6"/>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Events to send</h3>

                            <div className="grid gap-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Label htmlFor="task-created">Task created</Label>
                                        <p className="text-sm text-muted-foreground">
                                            When a new task is created
                                        </p>
                                    </div>
                                    <Switch id="task-created"/>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <Label htmlFor="task-updated">Task updated</Label>
                                        <p className="text-sm text-muted-foreground">
                                            When a task is modified
                                        </p>
                                    </div>
                                    <Switch id="task-updated"/>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <Label htmlFor="project-created">Project created</Label>
                                        <p className="text-sm text-muted-foreground">
                                            When a new project is created
                                        </p>
                                    </div>
                                    <Switch id="project-created"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => {
                        toast({
                            title: "Test webhook sent",
                            description: "A test webhook has been dispatched to your endpoint",
                        });
                    }}>
                        Send Test Webhook
                    </Button>
                    <Button>Save Webhook Settings</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Rate Limits</CardTitle>
                    <CardDescription>
                        View your current API usage and rate limits
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">API Requests (Current Hour)</span>
                                <span className="text-sm font-medium">128 / 1000</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[12.8%]"></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Resets in 32 minutes
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Daily Quota</span>
                                <span className="text-sm font-medium">1,540 / 10,000</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[15.4%]"></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Resets at midnight UTC
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-secondary/50 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Need higher limits?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Upgrade your plan to increase your API rate limits and quotas.
                        </p>
                        <Button variant="outline" size="sm">
                            View Plans
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ApiSettings;
