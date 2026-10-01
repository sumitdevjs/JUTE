"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Phone, MessageCircle, ShieldCheck, X } from "lucide-react";
import { trackWhatsAppClick, trackPhoneClick, trackQuoteSubmission } from "@/lib/gtag";
import styles from "./curing.module.css";

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
    id: "raw-curing-sheet",
    name: "Concrete Curing Jute Sheet (Hessian Wrap)",
    price: 499,
    category: "Curing Materials",
    description: "Heavy-duty, high water-retentive natural jute sheets. Designed specifically for construction sites to wrap concrete columns, beams, and slabs to prevent rapid evaporation and ensure maximum concrete strength.",
    specs: {
      dimensions: "1.2m x 100m Roll",
      thickness: "350 GSM (High Density)",
      feature: "Superior Water Retention",
      origin: "West Bengal, India"
    },
    image: "/raw_concrete_curing.png",
    images: ["/raw_concrete_curing.png", "/curing_sheet_detail.png"]
  },
  {
    id: "raw-hessian-roll",
    name: "Premium Burlap Hessian Roll",
    price: 499,
    category: "Hessian Cloth",
    description: "Natural brown raw jute fabric in rolls. Perfect for agricultural root ball wrapping, landscaping, soil erosion control (geotextiles), frost protection, and bulk rustic decorations.",
    specs: {
      dimensions: "1.5m x 50m Roll",
      thickness: "280 GSM (Medium Weave)",
      feature: "Breathable & Eco-friendly",
      origin: "Assam, India"
    },
    image: "/raw_hessian_roll.png",
    images: ["/raw_hessian_roll.png", "/hessian_roll_detail.png"]
  },
  {
    id: "raw-gunny-bags",
    name: "Bulk Jute Sacking Bags (Gunny Bags)",
    price: 499,
    category: "Packing Sacks",
    description: "Traditional high-capacity double-sewed jute sacking sacks. Extremely robust, breathable, and designed for heavy warehouse storage of grains, rice, potatoes, onions, and agricultural logistics.",
    specs: {
      dimensions: "Pack of 10 Bags (65cm x 105cm)",
      thickness: "480 GSM (Extra Heavy)",
      feature: "Heavy-Duty Wear Resistant",
      origin: "West Bengal, India"
    },
    image: "/raw_gunny_bags.png",
    images: ["/raw_gunny_bags.png", "/gunny_bags_detail.png"]
  },
  {
    id: "raw-sacking-bag",
    name: "Heavy-Grade Jute Sacking Rolls",
    price: 499,
    category: "Packing Sacks",
    description: "Classic, coarse-weave raw jute sacking rolls. Highly breathable and double-strength, designed for wrapping nursery plants, bulk logistics, construction floor protection, and heavy packing.",
    specs: {
      dimensions: "1.2m x 50m Roll",
      thickness: "450 GSM (Heavy Duty)",
      feature: "Highly Breathable Fiber",
      origin: "West Bengal, India"
    },
    image: "/raw_sacking_rolls_new.png",
    images: ["/raw_sacking_rolls_new.png"]
  }
];

const BANNER_IMAGES = [
  {
    src: "/raw_concrete_curing.png",
    alt: "Concrete Curing Jute Sheets on Site"
  },
  {
    src: "/raw_concrete_curing_2.png",
    alt: "High-density concrete curing rolls"
  },
  {
    src: "/jute_concrete_curing.png",
    alt: "Jute sheets for building construction"
  },
  {
    src: "/jute_curing_process.png",
    alt: "Raw Jute processing and curing"
  }
];

export default function CuringClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  // Estimator State
  const [slabLength, setSlabLength] = useState<number>(20);
  const [slabWidth, setSlabWidth] = useState<number>(10);
  const [slabsCount, setSlabsCount] = useState<number>(1);
  const [overlap, setOverlap] = useState<number>(10);
  const [rollType, setRollType] = useState<string>("raw-curing-sheet");

  // Estimator Calculations
  const selectedRoll = useMemo(() => {
    if (rollType === "raw-hessian-roll") {
      return { name: "Premium Burlap Hessian Roll (1.5m x 50m)", area: 75, gsm: 280, price: 499 };
    }
    if (rollType === "raw-sacking-bag") {
      return { name: "Heavy-Grade Jute Sacking Roll (1.2m x 50m)", area: 60, gsm: 450, price: 499 };
    }
    return { name: "Concrete Curing Jute Sheet (1.2m x 100m)", area: 120, gsm: 350, price: 499 };
  }, [rollType]);

  const totalSlabArea = slabLength * slabWidth * slabsCount;
  const totalAreaWithOverlap = totalSlabArea * (1 + overlap / 100);
  const rollsNeeded = Math.ceil(totalAreaWithOverlap / selectedRoll.area);
  const estimatedCost = rollsNeeded * selectedRoll.price;
  const estimatedWeight = Math.round(rollsNeeded * selectedRoll.area * selectedRoll.gsm / 1000);
  const estimatedWaterHold = Math.round(estimatedWeight * 1.5);

  const whatsappMessage = `Hi Ashok Enterprises, I estimated my jute curing sheet requirements using your calculator. 
Slab Dimensions: ${slabLength}m x ${slabWidth}m (Qty: ${slabsCount})
Overlap Selected: ${overlap}%
Total Area: ${totalSlabArea} sq m
Material: ${selectedRoll.name}
Estimated Rolls: ${rollsNeeded}
Please provide a bulk quote.`;

  const encodedMessage = encodeURIComponent(whatsappMessage);

  const categories = ["All", "Curing Materials", "Hessian Cloth", "Packing Sacks"];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
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
                <span className={styles.badge}>Industrial raw materials</span>
                <h1>Jute Raw Materials</h1>
                <p>
                  Direct sourcing of high-density construction curing sheets, hessian cloth rolls, twine, and bulk packing bags. Sustainable, highly durable, and biodegradable solutions.
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
              <h2 className={styles.sectionTitle}>Raw Materials Catalog</h2>
              <p className={styles.sectionSubtitle}>
                Select your required raw jute specifications. Click Buy / Enquire to view details and contact our sales desk directly.
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
                  <div className={styles.productImageContainer} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    <span className={styles.productBadge}>{product.category}</span>
                  </div>
                  <div className={styles.productDetails}>
                    <h3 className={styles.productName} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
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
                        <span className={styles.originalPrice}>₹{product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)}</span>
                        <span className={styles.currencySymbol}>₹</span>
                        <span className={styles.priceVal}>{product.price.toLocaleString("en-IN")}</span>
                        <span className={styles.discountPercent}>
                          ({Math.round((((product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)) - product.price) / (product.price === 99 ? 299 : (product.price === 199 ? 399 : 999))) * 100)}% off)
                        </span>
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

        {/* Jute Roll Estimator Section */}
        <section className={styles.estimatorSection} style={{ borderTop: "1px solid var(--border-light)", backgroundColor: "#fdfcf9", padding: "80px 0" }}>
          <div className="container">
            <div className={styles.catalogHeader}>
              <span className={styles.badge} style={{ display: "inline-block", margin: "0 auto 12px auto" }}>Project Estimator</span>
              <h2 className={styles.sectionTitle}>Concrete Curing Jute Estimator</h2>
              <p className={styles.sectionSubtitle} style={{ maxWidth: "680px", margin: "0 auto" }}>
                Calculate the number of jute rolls required for curing concrete slabs based on your construction site dimensions.
              </p>
            </div>

            <div className={styles.estimatorCard}>
              <div className={styles.estimatorLeft}>
                <h3 className={styles.estimatorSubheading}>Enter Slab Dimensions</h3>

                <div className={styles.inputGroupGrid}>
                  <div className={styles.inputFieldWrap}>
                    <label className={styles.inputLabel}>Slab Length (meters)</label>
                    <input
                      type="number"
                      min="1"
                      value={slabLength}
                      onChange={(e) => setSlabLength(Math.max(1, parseInt(e.target.value) || 0))}
                      className={styles.numInput}
                    />
                  </div>
                  <div className={styles.inputFieldWrap}>
                    <label className={styles.inputLabel}>Slab Width (meters)</label>
                    <input
                      type="number"
                      min="1"
                      value={slabWidth}
                      onChange={(e) => setSlabWidth(Math.max(1, parseInt(e.target.value) || 0))}
                      className={styles.numInput}
                    />
                  </div>
                </div>

                <div className={styles.inputGroupGrid} style={{ marginTop: "16px" }}>
                  <div className={styles.inputFieldWrap}>
                    <label className={styles.inputLabel}>Number of Slabs / Floors</label>
                    <input
                      type="number"
                      min="1"
                      value={slabsCount}
                      onChange={(e) => setSlabsCount(Math.max(1, parseInt(e.target.value) || 0))}
                      className={styles.numInput}
                    />
                  </div>
                  <div className={styles.inputFieldWrap}>
                    <label className={styles.inputLabel}>Overlap Allowance (%)</label>
                    <select
                      value={overlap}
                      onChange={(e) => setOverlap(parseInt(e.target.value))}
                      className={styles.selectInput}
                    >
                      <option value={5}>5% (Tight)</option>
                      <option value={10}>10% (Recommended)</option>
                      <option value={15}>15% (Generous)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputFieldWrap} style={{ marginTop: "16px" }}>
                  <label className={styles.inputLabel}>Select Curing Material Weave</label>
                  <select
                    value={rollType}
                    onChange={(e) => setRollType(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="raw-curing-sheet">Concrete Curing Jute Sheet (350 GSM — 1.2m x 100m)</option>
                    <option value="raw-hessian-roll">Premium Burlap Hessian Roll (280 GSM — 1.5m x 50m)</option>
                    <option value="raw-sacking-bag">Heavy-Grade Jute Sacking Roll (450 GSM — 1.2m x 50m)</option>
                  </select>
                </div>
              </div>

              <div className={styles.estimatorRight}>
                <h4 className={styles.resultsHeading}>Estimation Summary</h4>

                <div className={styles.estimateGrid}>
                  <div className={styles.estimateRow}>
                    <span className={styles.estimateLabel}>Total Slab Area</span>
                    <span className={styles.estimateVal}>{totalSlabArea} m²</span>
                  </div>
                  <div className={styles.estimateRow}>
                    <span className={styles.estimateLabel}>Area (inc. Overlap)</span>
                    <span className={styles.estimateVal}>{Math.round(totalAreaWithOverlap)} m²</span>
                  </div>
                  <div className={styles.estimateRow} style={{ borderBottom: "1.5px dashed var(--border)" }}>
                    <span className={styles.estimateLabel}>Roll Area Size</span>
                    <span className={styles.estimateVal}>{selectedRoll.area} m² / roll</span>
                  </div>
                  <div className={styles.estimateRowHighlight}>
                    <span className={styles.highlightLabel}>Required Jute Rolls</span>
                    <span className={styles.highlightVal}>{rollsNeeded} {rollsNeeded === 1 ? 'Roll' : 'Rolls'}</span>
                  </div>
                </div>

                <div className={styles.estimateSpecs}>
                  <div className={styles.specBox}>
                    <span className={styles.specBoxLabel}>Estimated Jute Weight</span>
                    <span className={styles.specBoxVal}>{estimatedWeight.toLocaleString("en-IN")} kg</span>
                  </div>
                  <div className={styles.specBox}>
                    <span className={styles.specBoxLabel}>Water Retention Cap.</span>
                    <span className={styles.specBoxVal}>{estimatedWaterHold.toLocaleString("en-IN")} L</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919968648541?text=${encodedMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.estimatorWhatsappBtn}
                  onClick={() =>
                    trackQuoteSubmission("Curing Sheet Estimator", {
                      area_sqm: totalSlabArea,
                      rolls_needed: rollsNeeded,
                      estimated_cost: estimatedCost,
                    })
                  }
                >
                  <MessageCircle size={18} /> Send Estimate Enquiry on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Applications Section */}
        <section className={styles.applicationsSection}>
          <div className="container">
            <div className={styles.bannerGrid}>
              <div className={styles.bannerText}>
                <span className={styles.subtitle} style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>Construction Curing</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--primary)", marginBottom: "16px" }}>
                  Concrete Curing on Construction Sites
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", opacity: 0.9 }}>
                  Ashok Enterprises provides high-density, raw jute sheets specially woven for building construction projects.
                  Wrapping concrete pillars, columns, and slabs with wet jute sacking sheets (Hessian bags) prevents the water from evaporating too quickly during the critical curing phase.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", opacity: 0.9 }}>
                  By maintaining continuous dampness, our premium jute wraps ensure concrete achieves maximum compressive strength, durability, and crack resistance.
                </p>
              </div>
              <div className={styles.appImageContainer}>
                <img
                  src="/raw_concrete_curing.png"
                  alt="Wet Jute Sheets Concrete Curing on Site"
                  className={styles.appImage}
                />
              </div>
            </div>

            <div className={styles.bannerGrid} style={{ marginTop: "64px", direction: "rtl" }}>
              <div className={styles.bannerText} style={{ direction: "ltr" }}>
                <span className={styles.subtitle} style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>Twine & Ropes</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--primary)", marginBottom: "16px" }}>
                  Strong Biodegradable Ropes & Twines
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", opacity: 0.9 }}>
                  Jute fibers are twisted and spun into multiple plies to create highly reliable, eco-friendly ropes (known locally as &quot;rasan&quot; or &quot;rassa&quot;).
                  These are extensively used for bundling agricultural crops, secure packaging, tying construction scaffolding, and creating artisanal crafts.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", opacity: 0.9 }}>
                  Fully biodegradable and compostable, our ropes offer excellent knot-holding ability and high tensile strength without harming the environment.
                </p>
              </div>
              <div className={styles.appImageContainer}>
                <img
                  src="/jute_rope_making.png"
                  alt="Jute Rope Twist Spinning in Factory"
                  className={styles.appImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Processing & Stitching Steps Section */}
        <section className={styles.processSection}>
          <div className="container">
            <div className="text-center" style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className={styles.subtitle} style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase" }}>Jute Lifecycle</span>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--primary)", marginTop: "8px" }}>
                How It is Made & Stitched
              </h2>
              <p style={{ maxWidth: "600px", margin: "12px auto 0 auto", opacity: 0.8, fontSize: "0.95rem" }}>
                From biological retting to state-of-the-art weaving and industrial sewing, follow the journey of the golden fiber.
              </p>
            </div>

            <div className={styles.processGrid}>
              <div className={styles.processCard}>
                <img src="/jute_curing_process.png" alt="Retting and washing" className={styles.processImage} />
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>1</div>
                  <h4>Retting & Stripping</h4>
                </div>
                <p>
                  Harvested stalks are submerged in slow-flowing fresh water for 12 to 18 days (retting) to decompose the pectin gums. Fibers are then stripped off the woody core manually and thoroughly washed.
                </p>
              </div>

              <div className={styles.processCard}>
                <img src="/jute_rope_making.png" alt="Combing and spinning jute yarn" className={styles.processImage} />
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>2</div>
                  <h4>Spinning & Weaving</h4>
                </div>
                <p>
                  Sun-dried raw golden fibers are combed and spun into strong yarns. These yarns are either twisted into heavy-duty ropes and twines, or woven on power looms into high-density jute fabrics and sacking sheets.
                </p>
              </div>

              <div className={styles.processCard}>
                <img src="/jute_stitching.png" alt="Stitching and bag assembly" className={styles.processImage} />
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>3</div>
                  <h4>Sewing & Stitching</h4>
                </div>
                <p>
                  Woven jute sheets are cut and stitched using heavy-duty industrial sewing machines to create shopping bags, sacks, and custom wraps. Heavy-grade cotton thread ensures secure seams and high load-bearing limits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bulk Enquiry Bar */}
        <section style={{ backgroundColor: "#e8f0e6", padding: "40px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <ShieldCheck size={40} style={{ color: "var(--primary)" }} />
              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--primary)" }}>Bulk Commercial Pricing Available</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "4px" }}>Are you sourcing for a large-scale construction or packaging site? Contact our team directly.</p>
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

      {/* Product Detail Modal (Rendered outside the animated container to prevent stacking context bugs) */}
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
                        className={`${styles.thumbnailBtn} ${activeImage === imgUrl ? styles.activeThumbnail : ""
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
                <span className={styles.productBadge} style={{ position: "static", display: "inline-block", width: "fit-content", marginBottom: "8px" }}>
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
                    <span className={styles.originalPriceLg}>₹{selectedProduct.price === 99 ? 299 : (selectedProduct.price === 199 ? 399 : 999)}</span>
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                    <span className={styles.discountBadgeLg}>
                      {Math.round((((selectedProduct.price === 99 ? 299 : (selectedProduct.price === 199 ? 399 : 999)) - selectedProduct.price) / (selectedProduct.price === 99 ? 299 : (selectedProduct.price === 199 ? 399 : 999))) * 100)}% OFF
                    </span>
                  </span>
                  <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>Bulk Order Price</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                  <a
                    href="tel:+919968648541"
                    className={styles.contactPhoneBtn}
                    onClick={() => trackPhoneClick(`Curing Modal: ${selectedProduct.name}`)}
                  >
                    <Phone size={18} /> Call: +91 99686 48541
                  </a>
                  <a
                    href={`https://wa.me/919968648541?text=Hi,%20I%20am%20interested%20in%20ordering%20raw%20material%20"${selectedProduct.name}"%20(Price:%20₹${selectedProduct.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactWhatsappBtn}
                    onClick={() =>
                      trackWhatsAppClick(`Curing Modal: ${selectedProduct.name}`, {
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
