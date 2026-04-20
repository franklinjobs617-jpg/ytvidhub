import React from "react";

type LandingSectionHeaderProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
};

export default function LandingSectionHeader({
  title,
  description,
  badge,
  className = "",
}: LandingSectionHeaderProps) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {badge ? (
        <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
          {badge}
        </span>
      ) : null}
      <h2 className={`text-3xl font-bold tracking-tight text-slate-900 md:text-5xl ${badge ? "mt-4" : ""}`}>
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
