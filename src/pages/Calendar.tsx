import PageLayout from "@/components/layout/PageLayout";
import TaskCalendar from "@/components/tasks/TaskCalendar";

const CalendarPage = () => {
    return (
        <PageLayout
            title="Calendar"
            subtitle="View scheduled tasks and events"
        >
            <TaskCalendar />
        </PageLayout>
    );
};

export default CalendarPage;
