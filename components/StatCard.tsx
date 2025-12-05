import React from "react";

type Props = {
  value: React.ReactNode;
  label?: React.ReactNode;
  centered?: boolean;
  variant?: "surface" | "background";
  className?: string;
};

export default function StatCard({ value, label, centered = false, variant = "background", className = "" }: Props) {
  const bg = variant === "surface" ? "bg-surface" : "bg-background";
  const base = `${bg} rounded-lg p-6 ${centered ? "text-center" : ""} border border-accent ${className}`.trim();

  return (
    <div className={base}>
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      {label ? <p className="text-text-secondary">{label}</p> : null}
    </div>
  );
}
