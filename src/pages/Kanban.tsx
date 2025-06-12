import PageLayout from "@/components/layout/PageLayout";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const Kanban = () => {
    return (
        <PageLayout
            title="Kanban Board"
            subtitle="Visualize your workflow and track progress"
        >
            <KanbanBoard/>
        </PageLayout>
    );
};

export default Kanban;