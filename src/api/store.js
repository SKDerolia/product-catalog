const API = "https://fakestoreapi.com";

export const Store = {
    products: [],
    categories: []
}

export async function fetchAllProducts() {
    try {
        const res = await fetch(`${API}/products`);
        if (!res.ok) {
            throw new Error("Not able to fetch products");
        }

        const data = await res.json()
        Store.products = data;
        return data;
    } catch (error) {
        console.error("getAllProducts Error: ", error)
        return []
    }
}

export async function fetchCategories() {
    try {
        const res = await fetch(`${API}/products/categories`);
        if (!res.ok) {
            throw new Error("Not able to fetch products Categories");
        }

        const data = await res.json()
        Store.categories = data.categories;
        return data;
    } catch (error) {
        console.error("getCategories Error: ", error)
        return []
    }
}

export async function fetchProductsByCategories(category) {
    try {
        const res = await fetch(`${API}/products/category/${encodeURIComponent(category)}`);
        if (!res.ok) {
            throw new Error("Not able to fetch products Categories");
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error("getCategories Error: ", error)
        return []
    }
}