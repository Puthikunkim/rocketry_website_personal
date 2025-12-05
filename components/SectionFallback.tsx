import React from 'react';

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

export default function SectionFallback({
  title = 'Unable to load this section',
  description = 'We are having trouble fetching this content. Please try again later.',
  className = '',
}: Props) {
  return (
    <div className={`max-w-7xl mx-auto mb-6 ${className}`}>
      <div role="status" aria-live="polite" className="bg-surface rounded-lg p-4 border border-accent">
        <p className="text-primary font-semibold">{title}</p>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
    </div>
  );
}
