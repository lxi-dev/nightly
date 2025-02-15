'use client';

import { HomeIcon,UserGroupIcon, TableCellsIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Places', href: '/places', icon: HomeIcon },
    { name: 'Kollektiv', href: '/profile', icon: UserGroupIcon },
    { name: 'Schichtplan', href: '/happenings', icon: TableCellsIcon },
];


export const PageNavLinks = () => {
    const pathname = usePathname()

    return (
        <main>
            <div className="flex flex-row items-center justify-between gap-4">
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                        "flex flex-wrap items-center justify-center flex flex-col bg-white dark:bg-gray-700 overflow-hidden w-10 h-10 border-slate-700 shadow-sm rounded-md dark:hover:bg-aurora-600 hover:bg-violet-300 pt-3 pb-3 text-sm font-medium dark:text-white dark:hover:text-black hover:text-white",
                        {
                            'bg-gray-200 dark:bg-aurora-200 text-black dark:text-white shadow-sm': pathname === link.href,
                        },
                        )}>
                        <LinkIcon className="w-6" />
                    </Link>
                    );
                })}
            <Link
                href={"/api/auth/signout"}
                className="flex flex-wrap items-center justify-center flex flex-col bg-white overflow-hidden w-10 h-10 border-slate-700 shadow-sm rounded-md hover:bg-violet-300 pt-3 pb-3 text-sm font-medium hover:text-gray-100">
                <UserIcon />
            </Link>
            </div>
        </main>
    );
};