"use client";

import { useState } from "react";
import {
  IconHouse6Fill24,
  IconUsersShakingHandsFill24,
  IconCalendarFill24,
  IconCircleQuestionFill24,
} from "nucleo-core-fill-24";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <IconHouse6Fill24 />,
  },
  {
    id: "community",
    label: "Community",
    icon: <IconUsersShakingHandsFill24 />,
  },
  {
    id: "events",
    label: "Events",
    icon: <IconCalendarFill24 />,
  },
  {
    id: "support",
    label: "Support",
    icon: <IconCircleQuestionFill24 />,
  },
];

function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 53 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M53 46.666L26.5 62L0 46.666V16.003L26.5 31.333L53 16V26.224L26.5 41.554L10.209 32.128V42.362L26.499 51.771L53 36.44V46.666Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 11.986L26.506 24L46 11.984L26.506 0L20.033 3.983L33.013 11.986L26.5 15.985L13.502 7.983L7 11.986Z" fill="currentColor"/>
    </svg>
  );
}

export function BottomNav() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="mb-6 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === item.id
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}

        {/* Center Menu Button */}
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            activeTab === "menu"
              ? "text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BrandLogo className="h-6 w-auto" />
          <span className="text-xs mt-1">Menu</span>
        </button>

        {navItems.slice(2).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === item.id
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
