"use client";

import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Inner component containing hooks — wrapped later in Suspense
function TabsRowInner() {
  const tabs = [{ name: "Components", href: "/components" }];
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State setup (prefilled from URL if available)
  const [theme, setTheme] = useState(searchParams.get("theme") || "");
  const [intensity, setIntensity] = useState(
    searchParams.get("intensity") || ""
  );

  // Update URL params when theme or intensity changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (theme) params.set("theme", theme);
    else params.delete("theme");

    if (intensity) params.set("intensity", intensity);
    else params.delete("intensity");

    const query = params.toString();
    router.replace(`${path}${query ? `?${query}` : ""}`);
  }, [theme, intensity]); // eslint-disable-line react-hooks/exhaustive-deps

  const clearFilters = () => {
    setTheme("");
    setIntensity("");
    router.replace(path); // Clear all params
  };

  return (
    <div className="w-full py-4 pb-[30px] flex flex-col md:flex-row justify-between gap-y-4 md:gap-y-0 overflow-x-auto">
      {/* Left: Tabs */}
      <div className="py-2 flex gap-x-8">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`my-1 transition-colors ease-in-out w-fit duration-300 hover:text-white font-medium ${
              path === tab.href ? "font-semibold text-white" : "text-gray-500"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Right: Filters */}
      <div className="py-2 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-gray-500 font-medium">Filters:</span>

        {/* Theme Select */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-transparent border border-white/40 rounded-md px-2 py-1 text-white/80"
        >
          <option value="">Theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        {/* Data Intensity Select */}
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="bg-transparent border border-white/40 rounded-md px-2 py-1 text-white/80"
        >
          <option value="">Data Density</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="text-gray-400 hover:text-white border border-white/30 rounded-md px-3 py-1 transition-colors"
        >
          Clear
        </button>

        {/* Search Input */}
        <div className="border border-white/40 rounded-md px-3 py-1">
          <input
            type="text"
            placeholder="Search components..."
            className="px-2 py-1 bg-transparent outline-none text-white/80 placeholder:text-white/50"
          />
        </div>
      </div>
    </div>
  );
}

// ✅ Suspense-wrapped export to silence useSearchParams() build warnings
export default function TabsRow() {
  return (
    <Suspense
      fallback={<div className="text-white/50">Loading filters...</div>}
    >
      <TabsRowInner />
    </Suspense>
  );
}
