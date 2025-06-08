import {Link} from "react-router-dom";
import {ChevronRight} from "lucide-react";

interface BreadcrumbProps {
    items: {
        label: string;
        href: string;
    }[];
}

const BreadCrumb = ({items}: BreadcrumbProps) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-muted-foreground mx-1"/>
                        {index === items.length - 1 ? (
                            <span className="text-sm font-medium">{item.label}</span>
                        ) : (
                            <Link
                                to={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default BreadCrumb;
