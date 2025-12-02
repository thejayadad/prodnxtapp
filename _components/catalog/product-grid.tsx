// components/catalog/product-grid.tsx
import Image from "next/image";

const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Sample Product ${i + 1}`,
  brand: "Creator Name",
  imageUrl: "/placeholder-product.png",
}));

export function ProductGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {PRODUCTS.map((product) => (
        <article key={product.id} className="group flex flex-col">
          <div className="relative mb-3 aspect-[3/4] overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <h3 className="text-sm font-semibold tracking-tight">
            {product.name}
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {product.brand}
          </p>
        </article>
      ))}
    </div>
  );
}
