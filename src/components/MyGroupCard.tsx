"use client";

import { MyGroup, GroupCategory } from "@/types";
import {
  IconUsersFill24,
  IconDumbbellFill24,
  IconSuitcaseFill24,
} from "nucleo-core-fill-24";

function getCategoryIcon(category: GroupCategory) {
  switch (category) {
    case "fitness":
      return <IconDumbbellFill24 className="w-5 h-5" />;
    case "professional":
      return <IconSuitcaseFill24 className="w-5 h-5" />;
    default:
      return <IconUsersFill24 className="w-5 h-5" />;
  }
}

interface MyGroupCardProps {
  group: MyGroup;
  onClick?: (groupId: string) => void;
}

export function MyGroupCard({ group, onClick }: MyGroupCardProps) {
  return (
    <button
      onClick={() => onClick?.(group.id)}
      className="w-full flex items-center gap-4 p-4 border-b border-border text-left hover:bg-secondary/50 transition-colors"
    >
      <div className="relative">
        {group.coverImage ? (
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
            {getCategoryIcon(group.category)}
          </div>
        )}
        {group.hasUnread && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-3 ring-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{group.name}</h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              group.role === "manager" || group.role === "admin"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {group.role === "admin"
              ? "Admin"
              : group.role === "manager"
              ? "Manager"
              : "Member"}
          </span>
          <span className="text-sm text-muted-foreground">
            {group.memberCount} members
          </span>
        </div>
      </div>
      <svg
        className="w-5 h-5 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
