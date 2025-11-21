export const Discount_BY_CATEGORY = {
    "men's clothing": 0.20,
    "women's clothing": 0.20,
    "jewelery": 0.05,
    "electronics": 0.10
}

export function getDiscountForCategory(category) {
    return Discount_BY_CATEGORY[category] || 0
}

export function roundTwo(n) {
    return Math.round(n * 100) / 100
}

export function PriceAfterDiscount(product, apply) {
    if (!apply) return product.price;

    const discount = getDiscountForCategory(product.category)
    if (!discount) return product.price;
    return roundTwo(product.price * (1 - discount));
}