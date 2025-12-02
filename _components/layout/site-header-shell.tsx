// components/layout/site-header-shell.tsx
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

type HeaderShellProps = {
  template: CatalogTemplate;
  // shape this to match your auth user
  user: { name?: string | null; email?: string | null } | null;
};

export function HeaderShell({ template, user }: HeaderShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Sticky header (nav + categories) */}
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

          {/* Right side: user + search + mobile menu */}
          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden text-[11px] uppercase tracking-[0.18em] text-neutral-400 sm:inline">
                {user.email}
              </span>
            )}

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

        {/* Category bar – wraps on small, scrolls on md+ */}
        <CategoryBar categories={template.categories} />
      </header>

      {/* Full-screen mobile overlay menu (OVER header) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden">
          <div className="flex h-full w-full flex-col px-4 pt-6 pb-8">
            {/* Top row */}
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

            {/* Nav links */}
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

            {/* Divider */}
            <div className="my-6 border-t border-neutral-800" />

            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
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
                      onClick={() => setMobileOpen(false)}
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
    </>
  );
}

type CategoryBarProps = {
  categories: string[];
};

function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <div className="border-t border-neutral-900">
      <div
        className="
          no-scrollbar
          mx-auto flex max-w-6xl flex-wrap gap-2
          px-4 py-2
          text-xs font-medium uppercase tracking-[0.2em] text-neutral-200
          md:flex-nowrap md:overflow-x-auto md:overflow-y-hidden
        "
      >
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
