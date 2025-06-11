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