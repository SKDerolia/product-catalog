export default function CategoryList({ categories, selectedCategory, setSelectedCategory }) {
    return (
        <aside className="category-list">
            <h3 onClick={() => setSelectedCategory("all")} style={{ cursor: "pointer" }}>
                All Categories
            </h3>
            <ul>
                {categories?.map(cat => (
                    <li
                        key={cat}
                        className={cat === selectedCategory ? "active" : ""}
                        onClick={() => setSelectedCategory(cat)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                setSelectedCategory(cat)
                        }}>
                        {cat}
                    </li>
                ))}
            </ul>
        </aside>
    )
}