'use client';

import React, { useState } from 'react';

interface TabContent {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface DesignSystemTabsProps {
  title: string;
  description?: string;
  tabs: TabContent[];
  defaultTabId?: string;
}

export default function DesignSystemTabs({
  title,
  description,
  tabs,
  defaultTabId,
}: DesignSystemTabsProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id || '');

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <section className="w-full py-4">
      <div className="mx-auto flex flex-col gap-5" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div className="space-y-3">
          <h2
            className="text-xl font-semibold"
            style={{ color: '#1F1F1F', letterSpacing: '0px' }}
          >
            {title}
          </h2>
          {description && (
            <p className="text-base font-normal" style={{ color: '#6B6B6B' }}>
              {description}
            </p>
          )}
        </div>

        {/* Segmented Control */}
        <div className="flex gap-0 rounded-2xl p-1" style={{ backgroundColor: '#F0F0F0', width: 'fit-content' }}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200"
                style={{
                  color: isActive ? '#FFFFFF' : '#6B6B6B',
                  backgroundColor: isActive ? '#1F1F1F' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab && (
          <div
            className="space-y-4 pt-4"
            style={{ color: '#6B6B6B' }}
          >
            {activeTab.content}
          </div>
        )}
      </div>
    </section>
  );
}
