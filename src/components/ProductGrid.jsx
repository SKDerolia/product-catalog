import ProductCard from "./ProductCard";

export default function ProductGrid({ products, discountsApplied }) {
    if (!products || products.length === 0) return
    <div>No Products match filters.</div>

    return (
        <section className="product-grid">
            {products.map(p => (
                <ProductCard key={p.id} product={p} discountsApplied={discountsApplied} />
            ))}
        </section>
    )
}