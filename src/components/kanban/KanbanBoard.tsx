interface KanbanTask {
    id: string;
    title: string;
    description: string;
    status: "to-do" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    assignee: {
        name: string;
        avatar?: string;
        initials: string;
    };
    tags: string[];
    dueDate?: string;
}


const initialTasks: KanbanTask[] = [
    {
        id: "task1",
        title: "Create wireframes",
        description: "Design initial wireframes for the dashboard",
        status: "to-do",
        priority: "high",
        assignee: {
            name: "John Doe",
            initials: "JD",
        },
        tags: ["design", "ui"],
        dueDate: "2025-06-12",
    },
    {
        id: "task2",
        title: "Implement auth system",
        description: "Set up authentication with JWT",
        status: "in-progress",
        priority: "urgent",
        assignee: {
            name: "Farzad Asgari",
            initials: "FA",
        },
        tags: ["backend", "security"],
        dueDate: "2025-06-10",
    },
    {
        id: "task3",
        title: "Design logo",
        description: "Create a new logo for the product",
        status: "review",
        priority: "medium",
        assignee: {
            name: "Sarah Lee",
            initials: "SL",
        },
        tags: ["design", "branding"],
    },
    {
        id: "task4",
        title: "Fix navigation bug",
        description: "Mobile navigation menu doesn't work on iOS",
        status: "done",
        priority: "high",
        assignee: {
            name: "Alice Smith",
            initials: "AS",
        },
        tags: ["bug", "mobile"],
        dueDate: "2025-06-08",
    },
    {
        id: "task5",
        title: "User testing",
        description: "Conduct user testing for the new features",
        status: "to-do",
        priority: "medium",
        assignee: {
            name: "Tom Wilson",
            initials: "TW",
        },
        tags: ["testing", "ux"],
        dueDate: "2025-06-06",
    },
    {
        id: "task6",
        title: "API documentation",
        description: "Write documentation for REST API endpoints",
        status: "review",
        priority: "low",
        assignee: {
            name: "John Doe",
            initials: "JD",
        },
        tags: ["documentation", "api"],
    },
    {
        id: "task7",
        title: "Database optimization",
        description: "Optimize database queries for performance",
        status: "in-progress",
        priority: "high",
        assignee: {
            name: "Mike Johnson",
            initials: "MJ",
        },
        tags: ["database", "performance"],
        dueDate: "2023-06-04",
    },
    {
        id: "task8",
        title: "Payment integration",
        description: "Integrate Stripe payment gateway",
        status: "done",
        priority: "urgent",
        assignee: {
            name: "Sarah Lee",
            initials: "SL",
        },
        tags: ["payments", "integration"],
        dueDate: "2025-06-02",
    },
];