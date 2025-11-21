export default function Header({ sortOption, setSortOption, discountEnabled }) {
    return (
        <header className="top-controls">
            <div>
                <label> Sort: </label>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="none">None</option>
                    <option value="Price-asc">Price: Low to High</option>
                    <option value="Price-desc">Price: High to Low</option>
                    <option value="discount-desc"
                    >Discount: High to Low </option>
                </select>
            </div>
        </header>
    )
}