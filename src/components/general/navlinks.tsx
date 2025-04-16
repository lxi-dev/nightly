'use client';

import { UserIcon } from "@heroicons/react/24/outline";
import { FaCity } from "react-icons/fa";
import { TbCalendarWeekFilled } from "react-icons/tb";
import { Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "nglty/contexts/profileContext";

const links = [
    { name: 'Places', href: '/places', icon: FaCity, admin: false },
    { name: 'Happenings', href: '/happen', icon: TbCalendarWeekFilled, admin: false },
    { name: 'Admin', href: '/admin', icon: Shield, admin: true },
    { name: 'Profile', href: '/profile', icon: UserIcon, admin: false}
];

export const PageNavLinks = ({role}: {role: string}) => {
    const pathname = usePathname()
    const { location } = useProfile();

    if (!location) return null;
    return (
        <main>
            <div className="flex flex-row items-center justify-between gap-4">
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    if (link.admin && role !== 'admin') return;
                    return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`"flex flex-wrap items-center justify-center flex flex-col overflow-hidden w-10 h-10 border-slate-700 shadow-sm rounded-md hover:bg-violet-300 text-sm font-medium dark:text-white hover:text-white ${pathname.includes(link.href) ? 'bg-violet-300 dark:bg-fuchsia-500 dark:hover:bg-violet-500 text-black dark:text-white shadow-sm' : 'bg-white dark:bg-gray-700 '}`}>
                        <LinkIcon className="w-6 h-6" />
                    </Link>
                    );
                })}
            </div>
        </main>
    );
}