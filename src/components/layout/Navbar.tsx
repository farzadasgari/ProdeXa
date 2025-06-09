import {useState, useEffect} from "react";
import {Bell, Search, User} from "lucide-react";

const notificationsData = [
    {
        id: "1",
        title: "New task assigned",
        description: "You've been assigned to the Website Redesign project",
        time: "Just now",
        read: false,
    },
    {
        id: "2",
        title: "Meeting reminder",
        description: "Team meeting starts in 30 minutes",
        time: "30 min ago",
        read: false,
    },
    {
        id: "3",
        title: "Task completed",
        description: "Farzad completed the API documentation task",
        time: "2 hours ago",
        read: true,
    },
];