// components/catalog/filter-sidebar.tsx

import { CatalogTemplate, FilterDefinition } from "@/lib/catalog-config";

type FilterSidebarProps = {
  template: CatalogTemplate;
};

export function FilterSidebar({ template }: FilterSidebarProps) {
  return (
    <aside className="sticky top-28 hidden h-fit w-64 flex-shrink-0 space-y-4 border-r border-neutral-900 pr-6 md:block">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Filters
      </h2>

      <div className="space-y-4">
        {template.filters.map((filter) => (
          <FilterField key={filter.id} filter={filter} />
        ))}
      </div>
    </aside>
  );
}

function FilterField({ filter }: { filter: FilterDefinition }) {
  if (filter.type === "search") {
    return (
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {filter.label}
        </p>
        <input
          type="text"
          placeholder="Search products"
          className="w-full rounded-none border border-neutral-700 bg-black px-3 py-2 text-sm text-neutral-100 outline-none ring-0 focus:border-orange-400"
        />
      </div>
    );
  }

  // default: select field
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {filter.label}
      </p>
      <select className="select select-bordered w-full rounded-none border-neutral-700 bg-black text-sm text-neutral-100">
        {filter.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
