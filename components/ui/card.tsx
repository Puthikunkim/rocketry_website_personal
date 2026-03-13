import React from "react";

interface CardProps {
  readonly image: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly reverse?: boolean;
  readonly vertical?: boolean;
}

export default function Card({
  image,
  title,
  date,
  description,
  reverse = false,
  vertical = false,
}: CardProps) {
  if (vertical) {
    return (
      <div
        className="bg-surface rounded border border-accent hover:border-primary flex flex-col h-full transform-gpu will-change-transform transition-[border-color,box-shadow,transform,background-color,ring-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_2px_12px_0_rgba(194,86,50,0.15)] hover:shadow-[0_8px_28px_0_rgba(194,86,50,0.25)] hover:scale-[1.01] hover:-translate-y-1 hover:ring-1 hover:ring-primary/60 hover:cursor-pointer"
        style={{ backgroundColor: "#292929" }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t"
        />
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs" style={{ color: "#C25632" }}>
                {date}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 !text-white">{title}</h3>
            <p className="text-text-secondary text-sm mb-4">{description}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`bg-surface rounded border border-accent hover:border-primary flex h-96 transform-gpu will-change-transform transition-[border-color,box-shadow,transform,background-color,ring-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_2px_12px_0_rgba(194,86,50,0.15)] hover:shadow-[0_8px_28px_0_rgba(194,86,50,0.25)] hover:scale-[1.01] hover:-translate-y-1 hover:ring-1 hover:ring-primary/60 hover:cursor-pointer ${reverse ? "flex-row-reverse" : "flex-row"}`}
      style={{ backgroundColor: "#292929" }}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-3/5 object-cover rounded-l-lg rounded-r-none"
        style={
          reverse
            ? { borderRadius: "0 .5rem .5rem 0" }
            : { borderRadius: ".5rem 0 0 .5rem" }
        }
      />
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs" style={{ color: "#C25632" }}>
              {date}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 !text-white">{title}</h3>
          <p className="text-text-secondary text-sm mb-4">{description}</p>
        </div>
      </div>
    </div>
  );
}
