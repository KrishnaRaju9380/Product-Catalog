import React, { useEffect, useState } from 'react'
import { fetchProducts, fetchCategories } from '../api'
import '../styles/ProductList.css'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    inStock: '',
    page: 1,
    limit: 12
  })
  const [pagination, setPagination] = useState({ total: 0, pages: 1 })
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('DESC')
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [filters, sortBy, sortOrder])

  async function loadCategories() {
    try {
      const cats = await fetchCategories()
      setCategories(cats || [])
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  async function loadProducts() {
    setLoading(true)
    try {
      const result = await fetchProducts({
        ...filters,
        sort: sortBy,
        order: sortOrder
      })
      setProducts(result.items || [])
      setPagination({
        total: result.total,
        pages: result.pages,
        currentPage: result.page
      })
    } catch (err) {
      console.error('Failed to load products:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleFilterChange(e) {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }))
  }

  function handlePageChange(newPage) {
    setFilters(prev => ({ ...prev, page: newPage }))
  }

  function handleQuantityChange(productId, value) {
    const qty = Math.max(1, Number(value) || 1)
    setQuantities(prev => ({ ...prev, [productId]: qty }))
  }

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === parseInt(id))
    return cat ? cat.name : 'Unknown'
  }

  return (
    <div className="product-catalog">
      {/* Header */}
      <div className="catalog-header">
        <h1>📦 Product Catalog</h1>
        <p>Discover our amazing collection of products</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="search">🔍 Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or description..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="category">📂 Category</label>
            <select
              id="category"
              name="categoryId"
              value={filters.categoryId}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="minPrice">💵 Min Price</label>
            <input
              id="minPrice"
              type="number"
              placeholder="0"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              min="0"
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxPrice">💵 Max Price</label>
            <input
              id="maxPrice"
              type="number"
              placeholder="9999"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              min="0"
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="inStock">📦 Stock</label>
            <select
              id="inStock"
              name="inStock"
              value={filters.inStock}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Items</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">🔤 Sort By</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="createdAt">Newest</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="order">📊 Order</label>
            <select
              id="order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="products-info">
              <p>Showing {products.length} of {pagination.total} products</p>
            </div>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <h3 className="product-name">{product.name}</h3>
                    {product.Category && (
                      <span className="product-category">{product.Category.name}</span>
                    )}
                  </div>
                  <p className="product-description">
                    {product.description ? product.description.substring(0, 80) + '...' : 'No description'}
                  </p>
                  <div className="product-tags">
                    {product.tags && product.tags.length > 0 && (
                      product.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))
                    )}
                  </div>
                    <div className="product-footer">
                      <div>
                        <div className="product-price">₹{parseFloat(product.price).toFixed(2)}</div>
                        <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                          {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <label style={{ fontWeight: 600, color: '#374151' }}>Qty</label>
                          <input
                            type="number"
                            min="1"
                            value={quantities[product.id] || 1}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            style={{ width: 70, padding: '6px 8px', borderRadius: 6, border: '1px solid #e5e7eb' }}
                          />
                        </div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>
                          Total: ₹{(parseFloat(product.price) * (quantities[product.id] || 1)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    {product.quantity > 0 && (
                      <div className="product-quantity">Stock: {product.quantity}</div>
                    )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-products">
            <p>No products found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>
          <div className="pagination-info">
            <span>Page {filters.page} of {pagination.pages}</span>
          </div>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === pagination.pages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

