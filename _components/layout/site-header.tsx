// components/layout/site-header.tsx
"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { CatalogTemplate } from "@/lib/catalog-config";

const MAIN_NAV_LINKS = [
  "Drops",
  "Locator",
  "Shop Online",
  "Catalog",
  "Blog",
  "About Us",
];

type SiteHeaderProps = {
  template: CatalogTemplate;
};

export function SiteHeader({ template }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/95 backdrop-blur">
      {/* Top nav row */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold uppercase tracking-wide">
            C
          </div>
          <span className="text-sm font-semibold tracking-wide">
            Cookie Catalog
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-300 md:flex">
          {MAIN_NAV_LINKS.map((item) => (
            <button
              key={item}
              className="transition-colors hover:text-orange-400"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right side: search + mobile menu button */}
        <div className="flex items-center gap-2">
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:border-orange-500 hover:text-orange-400 md:flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-200 hover:border-orange-500 hover:text-orange-400 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Category bar (shared desktop + mobile) */}
      <CategoryBar categories={template.categories} />

      {/* Mobile slide-over menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/80 md:hidden">
          <div className="ml-auto flex h-full w-72 flex-col border-l border-neutral-900 bg-black px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Menu
              </span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-200 hover:border-orange-500 hover:text-orange-400"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-3 text-sm font-medium text-neutral-200">
              {MAIN_NAV_LINKS.map((item) => (
                <button
                  key={item}
                  className="block w-full text-left uppercase tracking-[0.18em] hover:text-orange-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="mt-8 border-t border-neutral-800 pt-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {template.categories.map((category, index) => {
                  const isActive = index === 0;
                  return (
                    <button
                      key={category}
                      className={[
                        "rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]",
                        isActive
                          ? "bg-orange-500 text-black"
                          : "border border-neutral-700 text-neutral-200 hover:border-orange-500 hover:text-orange-400",
                      ].join(" ")}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// CategoryBar extracted so we can reuse it later if needed.
type CategoryBarProps = {
  categories: string[];
};

function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <div className="border-t border-neutral-900">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-200">
        {categories.map((category, index) => {
          const isActive = index === 0;
          return (
            <button
              key={category}
              className={[
                "whitespace-nowrap border px-4 py-2 transition-colors",
                isActive
                  ? "border-orange-500 bg-orange-500 text-black"
                  : "border-neutral-700 hover:border-orange-500 hover:text-orange-400",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
