'use client';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2 text-sm font-medium transition-colors
            border-b-2 -mb-px
            ${
              activeTab === tab.id
                ? 'border-[#005ea2] text-[#005ea2]'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }
          `}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
