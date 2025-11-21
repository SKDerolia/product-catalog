import { useEffect, useMemo, useState } from "react";
import * as api from "../api/store";
import { PriceAfterDiscount } from "../utils/discounts";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["all"]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOption, setSortOption] = useState("none");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function loadInitial() {
            try {
                setLoading(true);
                const [category, prods] = await Promise.all([api.fetchCategories(), api.fetchAllProducts()]);
                if (cancelled) return;
                setCategories(category)
                setProducts(prods)

                const prices = prods.map(p => p.price)
                if (prices.length) {
                    setMinPrice(Math.floor(Math.min(...prices)));
                    setMaxPrice(Math.ceil(Math.max(...prices)));
                }


            } catch (err) {
                if (!cancelled) setError(err.message || "Unknown Error");
            }
            finally {
                if (!cancelled) setLoading(false)
            }
        }
        loadInitial()
        return () => { cancelled = true; }
    }, []);

    useEffect(() => {
        let cancelled = false;
        async function loadByCategory() {
            try {
                setLoading(true);
                if (selectedCategory === "all") {
                    const products = await api.fetchAllProducts();
                    if (cancelled) return;
                    setProducts(products);
                }
                else {
                    const products = await api.fetchProductsByCategories(selectedCategory);
                    if (cancelled) return;
                    setProducts(products);
                }

            }
            catch (err) {
                if (!cancelled) setError(err.message || "Failed to load category");
            }
            finally {
                if (!cancelled) setLoading(false);
            }
        }
        loadByCategory();
        return () => { cancelled = true; }
    }, [selectedCategory]);

    const fiteredAndSorted = useMemo(() => {
        const discountsAllowed = selectedCategory === "all";

        let list = products && products.filter(product => {
            const effective = PriceAfterDiscount(product, discountsAllowed);
            return effective >= minPrice && effective <= maxPrice
        });

        if (sortOption === "Price-asc") {
            list.sort((a, b) => PriceAfterDiscount(a, discountsAllowed) -
                PriceAfterDiscount(b, discountsAllowed));
        }
        else if (sortOption === "Price-desc") {
            list.sort((a, b) => PriceAfterDiscount(b, discountsAllowed) -
                PriceAfterDiscount(a, discountsAllowed));
        }
        else if (sortOption === "discount-desc") {
            if (discountsAllowed) {
                list.sort((a, b) => {
                    const da = a.price - PriceAfterDiscount(a, true);
                    const db = b.price - PriceAfterDiscount(b, true);
                    return db - da;
                })
            }
        }
        return list;
    }, [products, sortOption, selectedCategory]);

    return {
        products,
        categories,
        selectedCategory,
        setSelectedCategory,
        fiteredAndSorted,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        sortOption,
        setSortOption,
        loading,
        error
    };
}