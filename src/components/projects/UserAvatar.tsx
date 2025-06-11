import {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {cn} from "@/lib/utils.ts";

interface UserAvatarProps {
    name: string;
    avatar?: string;
    initials: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const UserAvatar = ({name, avatar, initials, size = "md", className}: UserAvatarProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-12 w-12"
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm"
    };

    // Generate a background color based on the name
    const getBackgroundColor = (name: string) => {
        const colors = [
            "bg-red-100 text-red-800",
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-yellow-100 text-yellow-800",
            "bg-purple-100 text-purple-800",
            "bg-pink-100 text-pink-800",
            "bg-indigo-100 text-indigo-800",
            "bg-orange-100 text-orange-800"
        ];

        const hash = name.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);

        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className="relative inline-block">
            <Avatar
                className={cn(
                    sizeClasses[size],
                    "border-2 border-background transition-all duration-200 cursor-pointer",
                    isHovered && "scale-110 shadow-lg",
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {!imageError && avatar ? (
                    <AvatarImage
                        src={avatar}
                        alt={name}
                        onError={() => setImageError(true)}
                    />
                ) : null}
                <AvatarFallback
                    className={cn(
                        textSizes[size],
                        getBackgroundColor(name),
                        "font-semibold transition-all duration-200"
                    )}
                >
                    {initials}
                </AvatarFallback>
            </Avatar>

            {/* Tooltip on hover */}
            {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                    <div
                        className="bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg border text-sm whitespace-nowrap animate-fade-in">
                        {name}
                        <div
                            className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;