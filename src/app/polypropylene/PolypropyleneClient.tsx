"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Phone, MessageCircle, ShieldCheck, X } from "lucide-react";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/gtag";
import styles from "../curing/curing.module.css";

interface SpecsType {
  dimensions: string;
  thickness: string;
  feature: string;
  origin: string;
}

interface ProductType {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  specs: SpecsType;
  image: string;
  images: string[];
}

const PRODUCTS: ProductType[] = [
  {
    id: "white-laminated-bag",
    name: "White Laminated Woven Packing Bag",
    price: 499,
    category: "Packing Sacks",
    description: "Extra-tough, UV-stabilized white woven sacks. Highly resilient and moisture-resistant, making them ideal for heavy packing, flood control sand hoarding, and construction materials.",
    specs: {
      dimensions: "Pack of 25 Bags (55cm x 95cm)",
      thickness: "90 GSM (Laminated)",
      feature: "Water & Dust Resistant",
      origin: "Gujarat, India"
    },
    image: "/whitebags/white bag.jpeg",
    images: ["/whitebags/white bag.jpeg", "/whitebags/Polypropylene bag.jpeg", "/whitebags/show bags.jpeg"]
  },
  {
    id: "bulk-industrial-bag",
    name: "Bulk Industrial Material Woven Sacks",
    price: 699,
    category: "Packing Sacks",
    description: "Heavy-duty bulk industrial packaging sacks engineered for transporting aggregate, minerals, powders, construction rubble, and raw manufacturing batch materials.",
    specs: {
      dimensions: "Pack of 25 Bags (60cm x 100cm)",
      thickness: "100 GSM (Heavy Duty)",
      feature: "Heavy Load & Puncture Proof",
      origin: "Gujarat, India"
    },
    image: "/whitebags/bulk material.jpeg",
    images: ["/whitebags/bulk material.jpeg", "/whitebags/process.jpeg"]
  },
  {
    id: "raw-pp-woven-bag",
    name: "Raw Polypropylene High-Tensile Sacks",
    price: 449,
    category: "Grain Sacks",
    description: "High-strength unlaminated raw woven polypropylene bags, highly breathable and ideal for agricultural crops, grains, pulses, seeds, and dry warehouse storage.",
    specs: {
      dimensions: "Pack of 25 Bags (55cm x 95cm)",
      thickness: "85 GSM (Breathable PP)",
      feature: "High Tensile Breathable Weave",
      origin: "West Bengal, India"
    },
    image: "/whitebags/raw bag.jpeg",
    images: ["/whitebags/raw bag.jpeg", "/whitebags/raw material.jpeg"]
  },
  {
    id: "heavy-raw-material-sack",
    name: "Heavy Raw Material Processing Sacks",
    price: 749,
    category: "Logistics Sacks",
    description: "Coarse woven polypropylene sacks designed for raw industrial batch mixing, chemical processing, fertilizer hoarding, and heavy factory floor logistics.",
    specs: {
      dimensions: "Pack of 20 Bags (65cm x 105cm)",
      thickness: "110 GSM (Extra Heavy)",
      feature: "Chemical & Dust Shield",
      origin: "Gujarat, India"
    },
    image: "/whitebags/raw material.jpeg",
    images: ["/whitebags/raw material.jpeg", "/whitebags/process.jpeg"]
  },
  {
    id: "hdpe-uv-sandbag",
    name: "HDPE / PP Heavy-Duty UV Sandbags",
    price: 899,
    category: "Sandbags",
    description: "Heavy-gauge UV-stabilized woven polypropylene sandbags engineered specifically for emergency flood defense, soil erosion control, construction site ballast, and retaining walls.",
    specs: {
      dimensions: "Pack of 50 Bags (45cm x 75cm)",
      thickness: "100 GSM (UV Treated)",
      feature: "High Burst Pressure Shield",
      origin: "Gujarat, India"
    },
    image: "/white_woven_bag_detail.png",
    images: ["/white_woven_bag_detail.png", "/whitebags/white bag.jpeg"]
  },
  {
    id: "export-show-bag",
    name: "Export Quality White Woven Show Sacks",
    price: 599,
    category: "Packing Sacks",
    description: "Premium quality white woven sacks with reinforced hemmed tops and soft carry handles, perfect for export packaging, retail displays, and custom brand printing.",
    specs: {
      dimensions: "Pack of 25 Bags (55cm x 95cm)",
      thickness: "95 GSM (Premium Finish)",
      feature: "Double Stitched Export Quality",
      origin: "Gujarat, India"
    },
    image: "/whitebags/show bags.jpeg",
    images: ["/whitebags/show bags.jpeg", "/whitebags/deco.jpeg"]
  },
  {
    id: "deco-utility-bag",
    name: "Decorative & Utility White Woven Bags (50 KG)",
    price: 529,
    category: "Logistics Sacks",
    description: "Clean finish white woven polypropylene utility bags, suitable for retail packaging, organization, commercial shipping, and customized logo screen printing.",
    specs: {
      dimensions: "Pack of 25 Bags (50cm x 85cm)",
      thickness: "90 GSM (Laminated)",
      feature: "Clean Finish & Logo Printable",
      origin: "West Bengal, India"
    },
    image: "/whitebags/deco.jpeg",
    images: ["/whitebags/deco.jpeg", "/whitebags/show bags.jpeg"]
  },
  {
    id: "heavy-100kg-white-woven-bag",
    name: "100 KG Heavy Duty White Woven Bags",
    price: 899,
    category: "Logistics Sacks",
    description: "Extra large clean finish white woven polypropylene heavy utility bags engineered for 100 KG loading capacity, bulk grain/rice packaging, industrial shipping, and customized logo printing.",
    specs: {
      dimensions: "Pack of 25 Bags (75cm x 120cm - 100kg Cap)",
      thickness: "110 GSM (Extra Heavy Laminated)",
      feature: "100 KG Heavy Load & Logo Printable",
      origin: "West Bengal, India"
    },
    image: "/whitebags/woven_bag_100kg.png",
    images: ["/whitebags/woven_bag_100kg.png", "/whitebags/deco.jpeg", "/whitebags/show bags.jpeg"]
  }
];

const BANNER_IMAGES = [
  {
    src: "/pp_woven_bag_banner.png",
    alt: "Premium White Polypropylene Woven Bags"
  },
  {
    src: "/pp_sandbags_hero.png",
    alt: "UV-Treated Heavy Duty Sandbags"
  },
  {
    src: "/pp_grain_sacks.png",
    alt: "Agricultural Grain & Seed Storage Sacks"
  },
  {
    src: "/white_woven_bag_detail.png",
    alt: "White Woven Texture Packing Bag"
  }
];

export default function PolypropyleneClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  const categories = ["All", "Packing Sacks", "Sandbags", "Grain Sacks", "Logistics Sacks"];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.images?.[0] || selectedProduct.image);
    } else {
      setActiveImage(null);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className={`${styles.curingPage} animate-fade-in`}>
        {/* Banner */}
        <section className={styles.banner}>
          <div className="container">
            <div className={styles.bannerGrid}>
              <div className={styles.bannerText}>
                <span className={styles.badge}>Industrial Packing Sacks</span>
                <h1>PP Woven Packing Bags</h1>
                <p>
                  Direct factory supply of extra-tough White Laminated Woven Sacks, UV-Stabilized Sandbags, Transparent Seed Bags, and Heavy Cargo Logistics Sacks. High tensile strength, moisture-resistant, and durable.
                </p>
              </div>
              <div className={styles.bannerImageContainer}>
                {BANNER_IMAGES.map((img, index) => (
                  <div
                    key={img.src}
                    className={`${styles.bannerSlide} ${index === currentBannerIndex ? styles.activeSlide : ""}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={styles.bannerImage}
                    />
                  </div>
                ))}

                {/* Arrow Navigation */}
                <button
                  className={styles.bannerArrowLeft}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentBannerIndex((prev) => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length);
                  }}
                  aria-label="Previous slide"
                >
                  &lsaquo;
                </button>
                <button
                  className={styles.bannerArrowRight}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentBannerIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
                  }}
                  aria-label="Next slide"
                >
                  &rsaquo;
                </button>

                {/* Dot Indicators */}
                <div className={styles.bannerDots}>
                  {BANNER_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.bannerDot} ${index === currentBannerIndex ? styles.activeDot : ""}`}
                      onClick={() => setCurrentBannerIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Filters and Grid */}
        <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
          <div className="container">
            <div className={styles.catalogHeader}>
              <h2 className={styles.sectionTitle}>PP Woven Bags Catalog</h2>
              <p className={styles.sectionSubtitle}>
                Select your required woven bag specifications. Click Buy / Enquire to view details and contact our sales desk directly.
              </p>
            </div>

            {/* Filter Bar */}
            <div className={styles.filterBar}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div
                    className={styles.productImageContainer}
                    onClick={() => setSelectedProduct(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    <span className={styles.productBadge}>{product.category}</span>
                  </div>
                  <div className={styles.productDetails}>
                    <h3
                      className={styles.productName}
                      onClick={() => setSelectedProduct(product)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.name}
                    </h3>
                    <p className={styles.productDesc}>{product.description}</p>

                    {/* Product specs table */}
                    <div className={styles.specsGrid}>
                      <div className={styles.specRow}>
                        <span className={styles.specLabel}>Dimensions</span>
                        <span className={styles.specVal}>{product.specs.dimensions}</span>
                      </div>
                      <div className={styles.specRow}>
                        <span className={styles.specLabel}>Grade / Density</span>
                        <span className={styles.specVal}>{product.specs.thickness}</span>
                      </div>
                      <div className={styles.specRow}>
                        <span className={styles.specLabel}>Feature</span>
                        <span className={styles.specVal}>{product.specs.feature}</span>
                      </div>
                      <div className={styles.specRow}>
                        <span className={styles.specLabel}>Sourced From</span>
                        <span className={styles.specVal}>{product.specs.origin}</span>
                      </div>
                    </div>

                    <div className={styles.priceRow}>
                      <div className={styles.priceContainer}>
                        <span className={styles.originalPrice}>
                          ₹{Math.round(product.price * 2)}
                        </span>
                        <span className={styles.currencySymbol}>₹</span>
                        <span className={styles.priceVal}>{product.price.toLocaleString("en-IN")}</span>
                        <span className={styles.discountPercent}>(50% off)</span>
                      </div>
                      <button
                        className={styles.enquireBtn}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Phone size={14} /> Buy / Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commercial Order Banner */}
        <section
          style={{
            backgroundColor: "#e8f0e6",
            padding: "40px 0",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)"
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <ShieldCheck size={40} style={{ color: "var(--primary)" }} />
              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--primary)" }}>
                  Bulk Wholesale & Custom Logo Printing
                </h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "4px" }}>
                  Need custom flexo logo printing or custom bag sizes for high-volume orders? Contact our team directly.
                </p>
              </div>
            </div>
            <a
              href="tel:+919968648541"
              className={styles.bulkCallBtn}
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "12px 28px",
                borderRadius: "var(--radius-full)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "var(--shadow-sm)",
                transition: "var(--transition)"
              }}
            >
              Call: +91 99686 48541
            </a>
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
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "16px" }}
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
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.modalInfo}>
                <span
                  className={styles.productBadge}
                  style={{
                    position: "static",
                    display: "inline-block",
                    width: "fit-content",
                    marginBottom: "8px"
                  }}
                >
                  {selectedProduct.category}
                </span>
                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
                <p className={styles.modalDesc}>{selectedProduct.description}</p>

                {/* Specs Table */}
                <table className={styles.specTable}>
                  <tbody>
                    <tr>
                      <td className={styles.specLabel}>Dimensions</td>
                      <td>{selectedProduct.specs.dimensions}</td>
                    </tr>
                    <tr>
                      <td className={styles.specLabel}>Grade / Density</td>
                      <td>{selectedProduct.specs.thickness}</td>
                    </tr>
                    <tr>
                      <td className={styles.specLabel}>Special Feature</td>
                      <td>{selectedProduct.specs.feature}</td>
                    </tr>
                    <tr>
                      <td className={styles.specLabel}>Sourced From</td>
                      <td>{selectedProduct.specs.origin}</td>
                    </tr>
                  </tbody>
                </table>

                <div className={styles.modalPriceRow}>
                  <span className={styles.modalPrice}>
                    <span className={styles.originalPriceLg}>
                      ₹{Math.round(selectedProduct.price * 2)}
                    </span>
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                    <span className={styles.discountBadgeLg}>50% OFF</span>
                  </span>
                  <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>Bulk Order Price</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                  <a
                    href="tel:+919968648541"
                    className={styles.contactPhoneBtn}
                    onClick={() => trackPhoneClick(`PP Modal: ${selectedProduct.name}`)}
                  >
                    <Phone size={18} /> Call: +91 99686 48541
                  </a>
                  <a
                    href={`https://wa.me/919968648541?text=${encodeURIComponent(
                      `Hi, I am interested in ordering PP Woven Bag "${selectedProduct.name}" (Price: ₹${selectedProduct.price})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactWhatsappBtn}
                    onClick={() =>
                      trackWhatsAppClick(`PP Modal: ${selectedProduct.name}`, {
                        product_id: selectedProduct.id,
                        value: selectedProduct.price,
                      })
                    }
                  >
                    <MessageCircle size={18} /> WhatsApp: +91 99686 48541
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
