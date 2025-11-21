import useProducts from "./hooks/useProducts";
import CategoryList from "./components/CategoryList";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import "./styles/main.css"

function App() {
  const { categories, selectedCategory, setSelectedCategory,
    fiteredAndSorted, minPrice, maxPrice, setMinPrice, setMaxPrice, sortOption, setSortOption, loading, error
  } = useProducts()

  const discountsApplied = selectedCategory === "all"
  return (
    <div className="app-layout">
      <CategoryList categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="content">
        <Header sortOption={sortOption}
          setSortOption={setSortOption}
          discountsApplied={discountsApplied} />

        <div className="controls-row">
          <div className="category-indicator"> Showing:
            <strong> {selectedCategory}</strong>
          </div>
        </div>
        {loading && <div> Loading Products... </div>}
        {error && <div className="error">{error}</div>}

        <ProductGrid products={fiteredAndSorted}
          discountsApplied={discountsApplied} />
      </main>

    </div>
  )
}

export default App
