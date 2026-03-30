"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Bell,
    LineChart,
    Clock,
    Settings,
    User,
    Flame,
    Menu,
    X,
} from "lucide-react";

const PriMenu = [
    { name: "Home", link: "/", icon: Home },
    { name: "Trending", link: "/Tnews", icon: Flame },
    { name: "News", link: "/News", icon: Bell },
    { name: "Market", link: "/Market", icon: LineChart },
    { name: "Global Clock", link: "/Clock", icon: Clock },
];

const UserMenu = [
    { name: "Settings", link: "/Settings", icon: Settings },
    { name: "Profile", link: "/Pro", icon: User },
];

function MenuList({ title, items, pathname, close }) {
    return (
        <div className="w-full flex flex-col gap-1">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 mb-2">
                {title}
            </p>
            {items.map((item, i) => {
                const Icon = item.icon;
                const active = pathname === item.link;
                return (
                    <Link href={item.link} key={i} onClick={close}>
                        <li
                            className={`flex items-center gap-3 text-[13px] font-medium px-3 py-2.5 rounded-xl transition-all duration-150 list-none ${active
                                    ? "bg-white/[0.08] text-white"
                                    : "text-white/40  hover:bg-white/10 hover:shadow-sm transition-all"
                                }`}
                        >
                            <Icon
                                size={16}
                                className={active ? "text-green-400" : "text-white/30"}
                            />
                            {item.name}
                            {active && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                            )}
                        </li>
                    </Link>
                );
            })}
        </div>
    );
}

export default function SideNavbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a] border-b border-white/[0.06] flex items-center justify-between px-4 z-50">
                <span className="text-white font-semibold text-sm">
                    DailyEssential<span className="text-orange-400">.</span>
                </span>
                <button onClick={() => setOpen(true)}>
                    <Menu className="text-white/70" />
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-[220px] bg-[#0a0a0a] border-r border-white/[0.06] p-5 flex flex-col justify-between overflow-hidden shrink-0 z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-8 w-40 h-40 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button (Mobile) */}
                <div className="md:hidden flex justify-end mb-4">
                    <button onClick={() => setOpen(false)}>
                        <X className="text-white/70" />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="px-3 py-2">
                        <span className="text-white font-bold text-lg tracking-tight">
                            DailyEssential<span className="text-orange-400">.</span>
                        </span>
                        <p className="text-[10px] text-white/20 tracking-wide mt-0.5">
                            Your daily overview
                        </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />

                    <MenuList
                        title="Main Menu"
                        items={PriMenu}
                        pathname={pathname}
                        close={() => setOpen(false)}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />

                    <MenuList
                        title="Account"
                        items={UserMenu}
                        pathname={pathname}
                        close={() => setOpen(false)}
                    />

                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                            U
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[12px] font-semibold text-white/80 truncate">
                                User
                            </span>
                            <span className="text-[10px] text-white/25 truncate">
                                Free plan
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}