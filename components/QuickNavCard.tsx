import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function QuickNavCard({
  href,
  icon,
  title,
  description,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`bg-background rounded-lg p-6 text-center hover:bg-primary/10 border border-accent hover:border-primary transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out ${className}`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold !text-white mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </Link>
  );
}
