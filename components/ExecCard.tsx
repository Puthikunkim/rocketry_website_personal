import React from "react";

type Exec = {
  id?: number;
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
};

type Props = {
  exec: Exec;
  centered?: boolean;
  className?: string;
};

export default function ExecCard({ exec, centered = false, className = "" }: Props) {
  const base = `bg-background rounded-lg p-6 border border-accent ${centered ? "text-center" : ""} ${className}`.trim();

  return (
    <div className={base}>
      <div className="mb-4">
        <img
          src={exec.photo || ""}
          alt={exec.name}
          className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-accent"
        />
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{exec.name}</h3>
      {exec.role ? <p className="text-accent font-semibold mb-3">{exec.role}</p> : null}
      {exec.bio ? <p className="text-text-secondary text-sm leading-relaxed">{exec.bio}</p> : null}
    </div>
  );
}
