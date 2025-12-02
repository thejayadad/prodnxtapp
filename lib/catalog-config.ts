// lib/catalog-config.ts

export type FilterFieldType = "select" | "search";

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterDefinition = {
  id: string;
  label: string;
  type: FilterFieldType;
  options?: FilterOption[]; // select options; search has none
};

export type CatalogTemplate = {
  id: string;
  label: string;
  description?: string;
  categories: string[]; // shown in the category bar
  filters: FilterDefinition[]; // shown in the sidebar
};

// This is a "universal" template that works for:
// - house items
// - beats/music
// - ebooks
// - party / baby shower PDFs, etc.
export const defaultCatalogTemplate: CatalogTemplate = {
  id: "universal-digital-physical",
  label: "Universal Catalog",
  description:
    "Default catalog template for a mix of digital downloads and physical items.",
  categories: [
    "All Products",
    "Digital Downloads",
    "Physical Goods",
    "Music & Beats",
    "Ebooks",
    "Party & Event",
  ],
  filters: [
    {
      id: "type",
      label: "Product Type",
      type: "select",
      options: [
        { value: "all", label: "All Types" },
        { value: "digital", label: "Digital" },
        { value: "physical", label: "Physical" },
      ],
    },
    {
      id: "format",
      label: "Format",
      type: "select",
      options: [
        { value: "audio", label: "Audio / Beat" },
        { value: "pdf", label: "PDF / Printable" },
        { value: "ebook", label: "eBook" },
        { value: "template", label: "Template" },
      ],
    },
    {
      id: "occasion",
      label: "Occasion",
      type: "select",
      options: [
        { value: "birthday", label: "Birthday" },
        { value: "baby-shower", label: "Baby Shower" },
        { value: "wedding", label: "Wedding" },
        { value: "general", label: "General / Everyday" },
      ],
    },
    {
      id: "brand",
      label: "Brand / Creator",
      type: "select",
      options: [
        { value: "any", label: "Any Creator" },
        // this will later be filled dynamically per store
      ],
    },
    {
      id: "search",
      label: "Search",
      type: "search",
    },
  ],
};
