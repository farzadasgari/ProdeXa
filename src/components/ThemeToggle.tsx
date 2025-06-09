import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
                <Moon className="h-5 w-5"/>
            ) : (
                <Sun className="h-5 w-5"/>
            )}
        </Button>
    );
};

export default ThemeToggle;
