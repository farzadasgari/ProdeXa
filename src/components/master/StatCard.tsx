import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
    footer?: ReactNode;
    className?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const StatCard = ({
                      title,
                      value,
                      description,
                      icon,
                      footer,
                      className,
                      trend,
                  }: StatCardProps) => {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon && <div className="text-muted-foreground">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">{value}</div>
                    {trend && (
                        <div
                            className={cn(
                                "text-xs font-medium",
                                trend.isPositive ? "text-green-500" : "text-red-500"
                            )}
                        >
                            {trend.isPositive ? "+" : "-"}
                            {trend.value}%
                        </div>
                    )}
                </div>
                {description && (
                    <CardDescription className="text-xs text-muted-foreground mt-1">
                        {description}
                    </CardDescription>
                )}
            </CardContent>
            {footer && (
                <CardFooter className="pt-1 border-t text-xs text-muted-foreground">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );
};

export default StatCard;
