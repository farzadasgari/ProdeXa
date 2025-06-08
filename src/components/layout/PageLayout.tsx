import {ReactNode} from "react";
import BreadCrumb from "./BreadCrumb";
import {useLocation} from "react-router-dom";

interface PageLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

const PageLayout = ({children, title, subtitle}: PageLayoutProps) => {
    const location = useLocation();
    const generateBreadcrumbItems = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);

        return pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            return {
                label: segment.charAt(0).toUpperCase() + segment.slice(1),
                href,
            };
        });
    };

    const breadcrumbItems = generateBreadcrumbItems();

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <BreadCrumb items={breadcrumbItems}/>
                <div className="mt-3">
                    <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                    {subtitle && (
                        <p className="text-muted-foreground mt-1">{subtitle}</p>
                    )}
                </div>
            </div>
            <div className="space-y-6">{children}</div>
        </div>
    );
};

export default PageLayout;