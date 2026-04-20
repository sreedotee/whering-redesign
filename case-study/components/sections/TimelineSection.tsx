'use client';

import React, { useState } from 'react';

interface TimelineStep {
  id: string;
  label: string;
  title: string;
  status: 'pending' | 'in-progress' | 'complete';
  summary: string;
  details?: string;
  icon?: string;
}

interface TimelineSectionProps {
  title: string;
  description?: string;
  steps: TimelineStep[];
}

export default function TimelineSection({
  title,
  description,
  steps,
}: TimelineSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FFD700" />
            <circle cx="12" cy="12" r="4" fill="white" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#E8E5E6" strokeWidth="2" />
          </svg>
        );
    }
  };

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

        {/* Timeline Container */}
        <div className="relative pl-12">
          {/* Timeline Line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: '#E8E5E6' }}
          />

          {/* Timeline Steps */}
          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                {/* Status Indicator */}
                <div className="absolute -left-11 top-0">{getStatusIcon(step.status)}</div>

                {/* Step Content */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: '#707070' }}
                    >
                      {step.label}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-semibold"
                    style={{ color: '#1F1F1F' }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-base font-normal leading-relaxed"
                    style={{ color: '#6B6B6B' }}
                  >
                    {step.summary}
                  </p>

                  {/* Expandable Details */}
                  {step.details && (
                    <>
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === step.id ? null : step.id)
                        }
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: '#707070' }}
                      >
                        {expandedId === step.id ? '− Show less' : '+ Show more'}
                      </button>

                      {expandedId === step.id && (
                        <div className="mt-3 space-y-2">
                          <div
                            className="text-sm leading-relaxed"
                            style={{ color: '#6B6B6B' }}
                            dangerouslySetInnerHTML={{ __html: step.details }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
