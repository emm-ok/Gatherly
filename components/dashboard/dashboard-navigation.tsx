import {
    LayoutDashboard,
    CalendarDays,
    Plus,
    Settings,
} from "lucide-react";

export const dashboardNavigation = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        label: "Events",
        href: "/dashboard/events",
        icon: CalendarDays,
        exact: false,
    },
    {
        label: "Create event",
        href: "/dashboard/create-event",
        icon: Plus,
        exact: true,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        exact: true,
    },
] as const;