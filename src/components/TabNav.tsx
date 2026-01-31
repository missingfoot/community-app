"use client";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-70">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
