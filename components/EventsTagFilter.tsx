"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface EventsTagFilterProps {
  readonly selectedTag: string;
  readonly allTags: string[];
}

export default function EventsTagFilter({
  selectedTag,
  allTags,
}: Readonly<EventsTagFilterProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTagChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("tag");
    } else {
      params.set("tag", value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="mt-6 max-w-xs">
      <label
        className="block text-sm text-text-secondary mb-2"
        htmlFor="tag-filter"
      >
        Filter by tag
      </label>
      <select
        id="tag-filter"
        name="tag"
        value={selectedTag}
        onChange={(event) => handleTagChange(event.target.value)}
        className="w-full border border-accent rounded-md px-3 py-2 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
        style={{
          backgroundColor: "#232323",
          color: "#f5f5f5",
        }}
      >
        <option
          value="all"
          style={{ backgroundColor: "#232323", color: "#f5f5f5" }}
        >
          All Tags
        </option>
        {allTags.map((eventTag) => (
          <option
            key={eventTag}
            value={eventTag}
            style={{ backgroundColor: "#232323", color: "#f5f5f5" }}
          >
            {eventTag}
          </option>
        ))}
      </select>
    </div>
  );
}
