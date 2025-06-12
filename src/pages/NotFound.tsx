import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Home, Search, ArrowLeft, Compass, Calendar, CheckSquare, FolderOpen, BarChart} from "lucide-react";

const NotFound = () => {
    const location = useLocation();
    const [floatingTasks, setFloatingTasks] = useState<Array<{
        id: number;
        x: number;
        y: number;
        rotation: number
    }>>([]);

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );

        // Create floating task icons animation
        const tasks = Array.from({length: 8}, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
        }));
        setFloatingTasks(tasks);
    }, [location.pathname]);

    const taskIcons = [CheckSquare, FolderOpen, Calendar, BarChart, Compass, Home, Search, ArrowLeft];

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/10 relative overflow-hidden">
            {/* Floating Task Icons */}
            {floatingTasks.map((task, index) => {
                const IconComponent = taskIcons[index];
                return (
                    <div
                        key={task.id}
                        className="absolute opacity-20 animate-bounce"
                        style={{
                            left: `${task.x}%`,
                            top: `${task.y}%`,
                            transform: `rotate(${task.rotation}deg)`,
                            animationDelay: `${index * 0.5}s`,
                            animationDuration: `${4 + Math.random() * 2}s`,
                        }}
                    >
                        <IconComponent className="h-8 w-8 text-primary"/>
                    </div>
                );
            })}

            <div className="text-center space-y-8 z-10 max-w-2xl mx-auto px-6">
                {/* Main 404 Display */}
                <div className="relative">
                    <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Compass className="h-24 w-24 text-primary animate-spin" style={{animationDuration: '8s'}}/>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Oops! Task Not Found
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Looks like this page has been completed and archived, or maybe it was never in your project
                        backlog to begin with!
                    </p>
                </div>

                {/* Helpful Information */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                        <Search className="h-5 w-5"/>
                        <span className="text-sm">You were looking for: <code
                            className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code></span>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Here are some things you can try:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Check if the URL is spelled correctly</li>
                            <li>• Navigate back to your dashboard</li>
                            <li>• Search for what you need in our app</li>
                            <li>• Contact support if you think this is an error</li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="space-x-2">
                        <Link to="/">
                            <Home className="h-5 w-5"/>
                            <span>Back to Dashboard</span>
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="space-x-2">
                        <Link to="/projects">
                            <ArrowLeft className="h-5 w-5"/>
                            <span>Browse Projects</span>
                        </Link>
                    </Button>
                </div>

                <div className="pt-8">
                    <blockquote className="text-sm text-muted-foreground italic">
                        "Every great project starts with a single task... but this page isn't one of them! 🚀"
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
