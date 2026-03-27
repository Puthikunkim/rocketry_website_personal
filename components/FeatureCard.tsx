import React from "react";

type Props = {
  icon?: React.ReactNode | string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  centered?: boolean;
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
  const bg = variant === "surface" ? "bg-surface" : "bg-card";
  const Tag: React.ElementType = as;

  return (
    <Tag
      className={`group relative ${bg} rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
        centered ? "text-center" : ""
      } ${className}`.trim()}
      href={href}
      aria-label={ariaLabel}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {icon && (
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary text-2xl mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105 ${centered ? "mx-auto" : ""}`}>
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-text-main mb-3 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-text-secondary mb-3">{subtitle}</p>
      )}
      {children && (
        <div className="text-text-secondary text-sm leading-relaxed">
          {children}
        </div>
      )}
    </Tag>
  );
}
