"use client";

import React, { useState, useMemo } from "react";
import { Search, X, ArrowUpDown, Phone, MessageCircle, ShoppingBag, Briefcase, ShoppingBasket, Coffee, Gift, ChevronRight } from "lucide-react";
import styles from "./shop.module.css";

import { PRODUCTS, type Product } from "../../data/products";

const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
  "All": ShoppingBag,
  "Tote Bags": Briefcase,
  "Shopping Bags": ShoppingBasket,
  "Lunch & Bottle Bags": Coffee,
  "Gift Bags": Gift
};

export default function ShopClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.images?.[0] || selectedProduct.image);
    } else {
      setActiveImage(null);
    }
  }, [selectedProduct]);

  const categories = ["All", "Tote Bags", "Shopping Bags", "Lunch & Bottle Bags", "Gift Bags"];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, search, sortBy]);

  return (
    <div className={styles.shopPage}>
      <div className="animate-fade-in">
        {/* Shop Banner */}
        <section className={styles.banner}>
          <div className="container">
            <h1>Artisanal Store</h1>
            <p>
              Buy premium hand-woven goods directly from local cooperatives. Every purchase directly supports sustainable agriculture and rural artisan livelihoods.
            </p>
          </div>
        </section>

        {/* Main Grid Section */}
        <section className="section-padding" style={{ paddingTop: "0" }}>
          <div className="container">
            <div className={styles.layout}>
              {/* Sidebar Filters */}
              <aside className={styles.sidebar}>
                {/* Search */}
                <div className={styles.filterBox}>
                  <h3 className={styles.filterTitle}>Search</h3>
                  <div className={styles.searchWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className={styles.filterBox}>
                  <h3 className={styles.filterTitle}>Categories</h3>
                  <div className={styles.categoryList}>
                    {categories.map((cat) => {
                      const Icon = CATEGORY_ICONS[cat] || ShoppingBag;
                      return (
                        <button
                          key={cat}
                          className={`${styles.categoryBtn} ${
                            selectedCategory === cat ? styles.activeCategory : ""
                          }`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          <div className={styles.categoryBtnContent}>
                            <Icon size={16} className={styles.categoryIcon} />
                            <span>{cat}</span>
                          </div>
                          {selectedCategory === cat && (
                            <ChevronRight size={14} className={styles.activeChevron} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* Product Grid Area */}
              <main className={styles.productsSection}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                  <span className={styles.resultsCount}>
                    Showing <strong>{filteredProducts.length}</strong> products
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <ArrowUpDown size={16} style={{ opacity: 0.7 }} />
                    <select
                      className={styles.sortSelect}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort products by"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "80px 0", border: "1px dashed var(--border)", borderRadius: "var(--radius-md)" }}>
                    <p style={{ opacity: 0.7, fontSize: "1.1rem" }}>No products matches your search filters.</p>
                  </div>
                ) : (
                  <div className={styles.grid}>
                    {filteredProducts.map((product) => (
                      <div key={product.id} className={styles.card}>
                        <div
                          className={styles.imageArea}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <span className={styles.topSaleBadge}>
                            {Math.round((((product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)) - product.price) / (product.price === 99 ? 299 : (product.price === 199 ? 399 : 999))) * 100)}% OFF
                          </span>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }}
                          />
                        </div>
                        <div className={styles.details}>
                          <span className={styles.cardCategory}>{product.category}</span>
                          <h3
                            className={styles.cardName}
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product.name}
                          </h3>
                          <div className={styles.rating}>
                            <span className={styles.stars}>
                              {"★".repeat(Math.floor(product.rating))}
                              {product.rating % 1 !== 0 ? "½" : ""}
                            </span>
                            <span>
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                          <div className={styles.priceRow}>
                            <span className={styles.price}>
                              <span className={styles.originalPrice}>₹{product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)}</span>
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                             <button
                              className={styles.addBtn}
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Phone size={14} /> Buy / Enquire
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            </div>
          </div>
        </section>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeModal}
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details modal"
            >
              <X size={20} />
            </button>

            <div className={styles.modalContent}>
              <div className={styles.modalImageContainer}>
                <div className={styles.modalImage}>
                  <img
                    src={activeImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
                  />
                </div>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className={styles.modalThumbnails}>
                    {selectedProduct.images.map((imgUrl: string) => (
                      <button
                        key={imgUrl}
                        className={`${styles.thumbnailBtn} ${
                          activeImage === imgUrl ? styles.activeThumbnail : ""
                        }`}
                        onClick={() => setActiveImage(imgUrl)}
                      >
                        <img
                          src={imgUrl}
                          alt={`${selectedProduct.name} thumbnail`}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "2px" }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.modalInfo}>
                <span className={styles.modalCategoryBadge}>
                  {selectedProduct.category}
                </span>
                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
                <div className={styles.modalRatingRow}>
                  <span className={styles.stars}>
                    {"★".repeat(Math.floor(selectedProduct.rating))}
                  </span>
                  <span>
                    {selectedProduct.rating} ({selectedProduct.reviews} Verified Reviews)
                  </span>
                </div>

                <p className={styles.modalDesc}>{selectedProduct.description}</p>

                <div className={styles.modalBadges}>
                  <span className={styles.modalBadge}>🌿 {selectedProduct.material.split(",")[0]}</span>
                  <span className={styles.modalBadge}>📍 {selectedProduct.origin}</span>
                  <span className={styles.modalBadge}>📏 {selectedProduct.dimensions}</span>
                </div>

                <div className={styles.modalPriceRow}>
                  <div className={styles.modalPriceGroup}>
                    <span className={styles.modalPrice}>₹{selectedProduct.price.toLocaleString("en-IN")}</span>
                    <span className={styles.originalPriceLg}>₹{selectedProduct.price === 99 ? 299 : (selectedProduct.price === 199 ? 399 : 999)}</span>
                    <span className={styles.discountBadgeLg}>
                      {Math.round((((selectedProduct.price === 99 ? 299 : (selectedProduct.price === 199 ? 399 : 999)) - selectedProduct.price) / (selectedProduct.price === 99 ? 299 : (selectedProduct.price === 199 ? 399 : 999))) * 100)}% OFF
                    </span>
                  </div>
                  
                  <div className={styles.modalActionButtons}>
                    <a
                      href="tel:+919968648541"
                      className={styles.contactPhoneBtn}
                    >
                      <Phone size={16} /> Call: +91 99686 48541
                    </a>
                    <a
                      href={`https://wa.me/919968648541?text=Hi,%20I%20am%20interested%20in%20ordering%20"${selectedProduct.name}"%20(Price:%20₹${selectedProduct.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactWhatsappBtn}
                    >
                      <MessageCircle size={16} /> WhatsApp Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
