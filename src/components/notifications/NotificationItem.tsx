import React from 'react';
import {cn} from "@/lib/utils";

interface NotificationProps {
    notification: {
        id: string;
        title: string;
        description: string;
        time: string;
        read: boolean;
    };
    onClick: () => void;
}

const NotificationItem: React.FC<NotificationProps> = ({notification, onClick}) => {
    return (
        <div
            className={cn(
                "flex items-start p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                !notification.read && "bg-muted/30"
            )}
            onClick={onClick}
        >
            <div className="flex-1">
                <div className="flex items-center gap-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
        </div>
    );
};

export default NotificationItem;