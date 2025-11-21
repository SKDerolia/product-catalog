import { PriceAfterDiscount, getDiscountForCategory } from "../utils/discounts";

export default function ProductCard({ product, discountsApplied }) {
    const finalPrice = PriceAfterDiscount(product, discountsApplied);
    const discountProductCat = getDiscountForCategory(product.category) * 100;

    return (
        <div className="product-card">
            <h4 className="title">{product.title}</h4>
            <div className="thumb">
                <img src={product.image} alt={product.title} />
            </div>

            <div className="price-area">
                {discountProductCat > 0 ? (
                    <>
                        <div className="price-old">${product.price.toFixed(2)}</div>
                        <div className="price-new">${finalPrice.toFixed(2)}</div>
                        <div className="badge">-{discountProductCat}%</div>
                    </>
                ) : (
                    <div className="price">
                        ${product.price.toFixed(2)}
                    </div>
                )}
            </div>

            <div className="desc">{product.description.slice(0, 90)}...</div>

        </div>
    )

}