// @ts-nocheck
import { getAirtableRecords, AirtableRecord } from "@/lib/airtable";
import RecordCard from "@/components/RecordCard";
import SideNav from "@/components/sideNav";
import { Suspense } from "react";

type Fields = {
  "Component Name"?: string;
  figma_url?: string;
  Notes?: {
    thumbnails: {
      large?: { url: string };
    };
  }[];
  "Component Type"?: string[];
  Description?: string;
  Theme?: string; // e.g., "light" | "dark"
  "Colour Mode"?: string[]; // e.g., ["Light"] | ["Dark"]
  "Data Density"?: string; // e.g., "low" | "medium" | "high"
};

type ComponentsPageProps = {
  searchParams?: {
    tag?: string;
    theme?: string;
    intensity?: string;
    search?: string; // ✅ Added missing param
  };
};

export default async function Components({
  searchParams,
}: ComponentsPageProps) {
  const tag = searchParams?.tag || "all";
  const theme = searchParams?.theme || "";
  const search = searchParams?.search || "";
  const intensity = searchParams?.intensity || "";

  let records: AirtableRecord<Fields>[] = [];

  try {
    records = await getAirtableRecords<Fields>();
  } catch (e) {
    console.error("Error fetching records:", e);
  }

  // ✅ Generate unique component items for the sidebar
  const componentNames = records
    .map((r) => r.fields["Component Name"])
    .filter((name): name is string => Boolean(name));

  const uniqueNames = Array.from(new Set(componentNames));

  const componentItems = uniqueNames.map((name) => ({
    name,
    tag: name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, ""),
  }));

  componentItems.unshift({ name: "All Components", tag: "all" });

  // ✅ Filter by selected tag
  let filteredRecords =
    tag === "all"
      ? records
      : records.filter((r) => {
          const compName = r.fields["Component Name"];
          const slug =
            compName
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "") || "";
          return slug === tag;
        });

  // ✅ Normalize search input
  const normalizedSearch = search.replace(/[-&]/g, " ").trim().toLowerCase();

  // ✅ Apply filters: theme, intensity, and search
  filteredRecords = filteredRecords.filter((r) => {
    const recordTheme = r.fields["Colour Mode"]?.[0]?.toLowerCase() || "";
    const recordIntensity = r.fields["Data Density"]?.toLowerCase() || "";
    const recordName = r.fields["Component Name"]?.toLowerCase() || "";

    const matchesTheme = theme ? recordTheme === theme.toLowerCase() : true;
    const matchesIntensity = intensity
      ? recordIntensity === intensity.toLowerCase()
      : true;
    const matchesSearch = normalizedSearch
      ? recordName.includes(normalizedSearch)
      : true;

    return matchesTheme && matchesIntensity && matchesSearch;
  });

  return (
    <div className="flex">
      <Suspense
        fallback={
          <div className="text-white animate-spin border border-white/70 rounded-full w-3 h-3"></div>
        }
      >
        <SideNav componentItems={componentItems} />
      </Suspense>

      <div className="flex-1 px-4 md:px-8">
        {filteredRecords.length === 0 ? (
          <div className="text-gray-500 mt-4">
            No components found for{" "}
            <span className="font-medium">
              {tag}
              {theme && ` (${theme})`}
              {intensity && ` [${intensity}]`}
              {search && ` matching "${search}"`}
            </span>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecords.map((record) => (
              <RecordCard key={record.id} fields={record.fields} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
