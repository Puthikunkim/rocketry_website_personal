import React from "react";

type Props = {
  icon?: React.ReactNode | string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  centered?: boolean; // opt-in to preserve current look
  variant?: "surface" | "background";
  className?: string;
  as?: "div" | "a" | "button";
  href?: string;
  ariaLabel?: string;
};

export default function FeatureCard({
  icon,
  title,
  subtitle,
  children,
  centered = false,
  variant = "surface",
  className = "",
  as = "div",
  href,
  ariaLabel,
}: Props) {
  const bg = variant === "surface" ? "bg-surface" : "bg-background";
  const base = `${bg} rounded-lg p-6 border border-accent ${centered ? "text-center" : ""} ${className}`.trim();
  const Tag: any = as;

  return (
    <Tag className={base} href={href} aria-label={ariaLabel}>
      {icon ? <div className="text-4xl mb-4">{icon}</div> : null}
      {title ? <h3 className="text-xl font-bold text-primary mb-3">{title}</h3> : null}
      {subtitle ? <p className="text-text-secondary mb-3">{subtitle}</p> : null}
      {children ? <div className="text-text-secondary text-sm leading-relaxed">{children}</div> : null}
    </Tag>
  );
}
