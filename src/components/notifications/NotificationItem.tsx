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