// app/page.tsx
import { SiteHeader } from "@/_components/layout/site-header";

import { FilterSidebar } from "@/_components/catalog/filter-sidebar";
import { ProductGrid } from "@/_components/catalog/product-grid";
import { defaultCatalogTemplate } from "@/lib/catalog-config";

export default function HomePage() {
  const template = defaultCatalogTemplate;

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <SiteHeader template={template} />

      <main className="mx-auto flex max-w-6xl gap-8 px-4 pb-24 pt-6">
        <FilterSidebar template={template} />

        <section className="flex-1">
          {/* Header row above products */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
              256 Products
            </p>

            {/* Optional extra search or sort controls here later */}
          </div>

          <ProductGrid />
        </section>
      </main>

      {/* <SiteFooter /> */}
    </div>
  );
}
