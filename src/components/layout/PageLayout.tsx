import { ReactNode } from "react";
import BreadCrumb from "./BreadCrumb";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}