import React from "react";

type Props = {
  title?: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
};

export default function SectionFallback({
  title = "Unable to load this section",
  description = "We are having trouble fetching this content. Please try again later.",
  className = "",
  align = "center",
}: Props) {
  const justifyClass = align === "left" ? "justify-start" : "justify-center";
  const textAlignClass = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`w-full flex ${justifyClass} mb-6 ${className}`}>
      <div
        role="status"
        aria-live="polite"
        className="max-w-2xl w-full bg-surface rounded-lg p-4 border border-accent"
      >
        <p className={`text-primary font-semibold ${textAlignClass}`}>
          {title}
        </p>
        <p className={`text-text-secondary text-sm ${textAlignClass}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
