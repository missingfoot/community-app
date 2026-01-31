"use client";

import { Group, GroupCategory } from "@/types";
import { Button } from "./Button";
import {
  IconUsersFill24,
  IconDumbbellFill24,
  IconSuitcaseFill24,
} from "nucleo-core-fill-24";

const categoryLabels: Record<GroupCategory, string> = {
  social: "Social",
  fitness: "Fitness",
  professional: "Professional",
  hobbies: "Hobbies",
  food: "Food & Dining",
  wellness: "Wellness",
};

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

interface GroupCardProps {
  group: Group;
  onJoin?: (groupId: string) => void;
}

export function GroupCard({ group, onJoin }: GroupCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
        {getCategoryIcon(group.category)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{group.name}</h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
            {categoryLabels[group.category]}
          </span>
          <span className="text-sm text-muted-foreground">
            {group.memberCount} members
          </span>
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={() => onJoin?.(group.id)}>
        Join
      </Button>
    </div>
  );
}
