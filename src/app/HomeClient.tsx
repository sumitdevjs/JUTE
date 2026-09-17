"use client";

import React from "react";
import Link from "next/link";
import {
  Leaf,
  ArrowRight,
  Shield,
  ShoppingBag,
  Package,
  Phone,
  X,
  MessageCircle,
  CheckCircle,
  Truck,
  Factory,
  Award,
  Headphones,
  MapPin,
  Quote,
  ChevronLeft,
  ChevronRight,
  Calculator,
  ShieldCheck,
  Droplets,
  Sun,
  Layers,
  Zap,
} from "lucide-react";
import styles from "./page.module.css";

import { PRODUCTS as ALL_PRODUCTS, FEATURED_CURING_PRODUCTS, type Product } from "../data/products";

const WHITE_WOVEN_PRODUCT: Product = {
  id: "raw-white-sack",
  name: "White Laminated Woven Packing Bag",
  price: 499,
  category: "Packing Sacks",
  rating: 4.9,
  reviews: 164,
  image: "/white_woven_bag_detail.png",
  images: ["/white_woven_bag_detail.png"],
  description: "Extra-tough, UV-stabilized white woven sacks. Highly resilient and moisture-resistant, making them ideal for heavy packing, flood control sand hoarding, and construction materials.",
  origin: "Gujarat, India",
  material: "90 GSM Laminated White Woven PP/HDPE (UV Resistant)",
  dimensions: "Pack of 25 Bags (55cm x 95cm)"
};

const HERO_SLIDES = [
  {
    src: "/spiderman_hero_banner.jpg",
    desktopSrc: "/spiderman_hero_banner.jpg",
    mobileSrc: "/spiderman_mobile_hero.jpg",
    tag: "NEW ANNOUNCEMENT • SPECIAL LAUNCH SALE",
    title: "Spider Superhero Tote",
    subtitle: "Hand-Drawn Pop Culture Canvas",
    desc: "🔥 NEW ARRIVAL! Spider-Man & Deadpool artistic canvas tote. Heavy-duty organic cotton canvas with wide handles — Special Launch Offer at just ₹299!",
    panelBg: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #b91c1c 100%)",
    leftBg: "#f5ece1",
    accentColor: "#fca5a5",
  },
  {
    src: "/independence_hero_banner.jpg",
    desktopSrc: "/independence_hero_banner.jpg",
    mobileSrc: "/independence_mobile_hero.jpg",
    tag: "INDEPENDENCE DAY SALE • ANNOUNCEMENT",
    title: "Proud To Be Indian",
    subtitle: "Patriotic Tricolor Jute Tote",
    desc: "🇮🇳 INDEPENDENCE SPECIAL! Celebrate Indian pride with eco-friendly Tricolor & Ashoka Chakra printed golden jute bags. Limited stock on sale for ₹199!",
    panelBg: "linear-gradient(145deg, #c2410c 0%, #ea580c 32%, #0f172a 48%, #15803d 70%, #064e3b 100%)",
    leftBg: "#f5f0e6",
    accentColor: "#fef08a",
  },
  {
    src: "/jute_bags_sale_banner_desktop.png",
    desktopSrc: "/jute_bags_sale_banner_desktop.png",
    mobileSrc: "/jute_bags_sale_banner.png",
    tag: "MEGA SALE • UP TO 67% OFF",
    title: "Golden Fiber Sale",
    subtitle: "Premium Tote Bags",
    desc: "Huge discounts on 100% organic jute totes — strong, sustainable, starting at just ₹99!",
    panelBg: "linear-gradient(135deg, #1a3d1a 0%, #2e5a27 40%, #3d7a33 100%)",
    leftBg: "#1f4a1f",
    accentColor: "#86efac",
  },
  {
    src: "/pichwai_cow_desktop.png",
    desktopSrc: "/pichwai_cow_desktop.png",
    mobileSrc: "/pichwai_cow_mobile.png",
    tag: "Folk Art Collection",
    title: "Pichwai Cow & Calf",
    subtitle: "Handcrafted Heritage Art",
    desc: "Traditional Pichwai cow painting on 100% organic golden jute. A piece of Indian heritage in every bag.",
    panelBg: "linear-gradient(135deg, #5c3a1e 0%, #7a4f2a 40%, #9c6b3c 100%)",
    leftBg: "#6b4423",
    accentColor: "#fde68a",
  },
  {
    src: "/baddie_hibiscus_desktop.png",
    desktopSrc: "/baddie_hibiscus_desktop.png",
    mobileSrc: "/baddie_hibiscus_mobile.png",
    tag: "Baddie Collection",
    title: "Hibiscus Pink Tote",
    subtitle: "Vibrant Tropical Style",
    desc: "Chic blush-pink canvas jute tote with bold tropical hibiscus art & soft cotton handles.",
    panelBg: "linear-gradient(135deg, #4a1530 0%, #7a2040 40%, #9c2d52 100%)",
    leftBg: "#5a1a38",
    accentColor: "#fda4af",
  },
  {
    src: "/hamburg_sketch_desktop.png",
    desktopSrc: "/hamburg_sketch_desktop.png",
    mobileSrc: "/hamburg_sketch_mobile.png",
    tag: "City Edition",
    title: "Hamburg Landmark",
    subtitle: "Architectural Sketch Art",
    desc: "Unbleached raw golden jute shopping bag featuring hand-drawn city landmark sketch art.",
    panelBg: "linear-gradient(135deg, #1a2a4a 0%, #1e3a6e 40%, #2952a0 100%)",
    leftBg: "#1c2f52",
    accentColor: "#93c5fd",
  },
  {
    src: "/collection_traditional.png",
    desktopSrc: "/collection_traditional.png",
    mobileSrc: "/collection_traditional.png",
    tag: "Artisanal Art",
    title: "Madhubani Peacock",
    subtitle: "Hand-painted Jute Bag",
    desc: "Beautiful circular Madhubani peacock painting on natural jute thread with blue webbed handles.",
    panelBg: "linear-gradient(135deg, #4a1a3a 0%, #7a2060 40%, #a03078 100%)",
    leftBg: "#551a42",
    accentColor: "#f9a8d4",
  },
  {
    src: "/artistic_printed_jute_bags_sale.png",
    desktopSrc: "/artistic_printed_jute_bags_sale.png",
    mobileSrc: "/artistic_printed_jute_bags_sale.png",
    tag: "SPECIAL SALE • UP TO 67% OFF",
    title: "Art Collections",
    subtitle: "Sets of 4 Bags",
    desc: "Gorgeous printed canvas jute bags — Horse, Book, Floral & Bicycle. Special discount sale offer starting at ₹99!",
    panelBg: "linear-gradient(135deg, #1a2a2a 0%, #1e4a4a 40%, #226666 100%)",
    leftBg: "#1a3030",
    accentColor: "#67e8f9",
  },
];



const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    city: "Delhi",
    rating: 5,
    product: "Classic Artisanal Jute Tote Bag",
    text: "Bohot hi sundar bag mila! Quality ekdum first class hai. Maine 50 bags bulk order kiye corporate gifting ke liye aur sab ne tariff ki. Ashok ji bahut cooperative hain. Definitely recommend karunga!",
    avatar: "PS",
    avatarColor: "#2e5a27",
  },
  {
    id: 2,
    name: "Rajesh Agarwal",
    city: "Kolkata",
    rating: 5,
    product: "Concrete Curing Jute Sheet",
    text: "Construction site ke liye curing sheets liye — quality bahut achi hai. 350 GSM wali sheets pani retain karti hain perfectly. Delivery bhi time par aayi. Phir se order karunga next project mein.",
    avatar: "RA",
    avatarColor: "#b85a38",
  },
  {
    id: 3,
    name: "Meena Iyer",
    city: "Bangalore",
    rating: 5,
    product: "Madhubani Peacock Jute Lunch Bag",
    text: "Gift ke liye order kiya tha apni best friend ko — wo dekh ke dang reh gayi! Art itni detailed aur vibrant hai. Eco-friendly bhi hai toh double khushi. Packaging bhi neat thi. 10/10!",
    avatar: "MI",
    avatarColor: "#5a3e9c",
  },
  {
    id: 4,
    name: "Suresh Patel",
    city: "Ahmedabad",
    rating: 5,
    product: "Bulk Jute Sacking Bags",
    text: "Hamare grain storage ke liye 500 gunny bags order kiye. Ekdum perfect quality, breathable fabric. Price bhi market se kam tha. WhatsApp par baat karo toh turant reply milta hai — bahut achi service!",
    avatar: "SP",
    avatarColor: "#7a5c38",
  },
  {
    id: 5,
    name: "Kavita Nair",
    city: "Mumbai",
    rating: 5,
    product: "Pichwai Cow & Calf Jute Bag",
    text: "Maine apni boutique ke liye 100 bags order kiye — sab customers ko bohot pasand aaya! Hand-painted art ekdum authentic lag rahi thi. Return rate zero — log baar baar aate hain aisi bags ke liye!",
    avatar: "KN",
    avatarColor: "#c45c8a",
  },
];

const BRAND_LOGOS = [
  { name: "Haldiram's", src: "/brands/haldiram.png" },
  { name: "Tata AIG Insurance", src: "/brands/tata_insurance.png" },
  { name: "SBI Bank", src: "/brands/sbi.jpg" },
  { name: "YES Bank", src: "/brands/yes_bank.png" },
  { name: "Max Life Insurance", src: "/brands/max_life_insurance.jpg" },
];

const QUICK_CATEGORIES = [
  {
    title: "Handcrafted Art Totes",
    subtitle: "Madhubani, Pichwai & Designer Jute",
    tag: "Artisanal",
    img: "/madhubani_jute_bag.png",
    link: "/shop",
    badge: "Bestseller",
  },
  {
    title: "Concrete Curing Sheets",
    subtitle: "350+ GSM Heavy-Duty Hessian Wraps",
    tag: "Industrial",
    img: "/jute_concrete_curing.png",
    link: "/curing",
    badge: "Direct Factory",
  },
  {
    title: "Grain & Sacking Bags",
    subtitle: "Heavy-Duty Gunny Bags for Storage",
    tag: "Bulk Supply",
    img: "/raw_gunny_bags.png",
    link: "/curing",
    badge: "Wholesale",
  },
  {
    title: "Eco Gift & Utility Bags",
    subtitle: "Corporate Gifting & Daily Tote Range",
    tag: "Eco Friendly",
    img: "/baddie_tote_bag.jpg",
    link: "/shop",
    badge: "Custom Logo",
  },
];

const TRUST_BADGES = [
  {
    icon: Factory,
    title: "Direct from Manufacturer",
    desc: "No middlemen. Get wholesale prices straight from our production unit in West Bengal.",
    color: "#2e5a27",
    bg: "#e8f0e6",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    desc: "We ship to all 28 states and 8 union territories. Bulk orders dispatched within 3-5 days.",
    color: "#b85a38",
    bg: "#fbeee9",
  },
  {
    icon: Package,
    title: "Bulk Orders Welcome",
    desc: "Minimum order quantity starts from just 50 units. Corporate & government orders accepted.",
    color: "#1a6a7a",
    bg: "#e0f4f7",
  },
  {
    icon: Award,
    title: "100% Eco-Certified",
    desc: "All our jute is GOTS certified, chemical-free, and fully biodegradable within 2–5 weeks.",
    color: "#7a5c28",
    bg: "#f7f0e0",
  },
  {
    icon: Headphones,
    title: "WhatsApp Support 24/7",
    desc: "Direct line to our team on WhatsApp. Samples, pricing, customization — all on chat.",
    color: "#25d366",
    bg: "#e3fbed",
  },
];



// Animated Counter Hook
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function HomeClient() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [enquiryProduct, setEnquiryProduct] = React.useState<any>(null);
  const [filter, setFilter] = React.useState("All");
  const [activeImage, setActiveImage] = React.useState<string | null>(null);
  const [statsVisible, setStatsVisible] = React.useState(false);
  const [testimonialIndex, setTestimonialIndex] = React.useState(0);

  // White Woven Bag Estimator State
  const [wovenTargetKg, setWovenTargetKg] = React.useState<number>(1000);
  const [wovenBagCapacity, setWovenBagCapacity] = React.useState<number>(50);

  const wovenCalculations = React.useMemo(() => {
    const safeCapacity = wovenBagCapacity > 0 ? wovenBagCapacity : 50;
    const safeTargetKg = wovenTargetKg > 0 ? wovenTargetKg : 100;
    const bagsNeeded = Math.ceil(safeTargetKg / safeCapacity);
    const packsNeeded = Math.ceil(bagsNeeded / 25);
    const totalBags = packsNeeded * 25;
    const packPrice = 499;
    const originalPackPrice = 999;
    const totalCost = packsNeeded * packPrice;
    const originalTotalCost = packsNeeded * originalPackPrice;
    const totalSavings = originalTotalCost - totalCost;
    return {
      bagsNeeded,
      packsNeeded,
      totalBags,
      packPrice,
      totalCost,
      originalTotalCost,
      totalSavings
    };
  }, [wovenTargetKg, wovenBagCapacity]);


  const artisanalScrollRef = React.useRef<HTMLDivElement>(null);
  const curingScrollRef = React.useRef<HTMLDivElement>(null);
  const statsRef = React.useRef<HTMLDivElement>(null);
  const testimonialTouchStartX = React.useRef<number>(0);

  const handleTestimonialTouchStart = (e: React.TouchEvent) => {
    testimonialTouchStartX.current = e.touches[0].clientX;
  };

  const handleTestimonialTouchEnd = (e: React.TouchEvent) => {
    const diff = testimonialTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      } else {
        setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      }
    }
  };

  // Counters
  const counter1 = useCountUp(500, 2000, statsVisible);
  const counter2 = useCountUp(15, 1800, statsVisible);
  const counter3 = useCountUp(120, 2200, statsVisible);
  const counter4 = useCountUp(28, 1600, statsVisible);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    if (enquiryProduct) {
      setActiveImage(enquiryProduct.images?.[0] || enquiryProduct.image);
    } else {
      setActiveImage(null);
    }
  }, [enquiryProduct]);

  const filteredProducts = React.useMemo(() => {
    if (filter === "All") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial auto-advance
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal + stats counter trigger
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.sectionVisible);
            if (entry.target === statsRef.current) {
              setStatsVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(`.${styles.revealSection}`);
    elements.forEach((el) => observer.observe(el));
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="animate-fade-in">
        {/* 1. Hero Section — Split Layout */}
        <section className={styles.heroBannerSection}>
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.src}
              className={`${styles.heroBannerSlide} ${currentSlide === index ? styles.activeBannerSlide : ""}`}
            >
              {/* LEFT: Image Panel */}
              <div
                className={styles.heroBannerLeft}
                style={{ backgroundColor: slide.leftBg }}
              >
                <picture style={{ width: "100%", height: "100%", display: "block" }}>
                  <source media="(max-width: 640px)" srcSet={slide.mobileSrc} />
                  <img
                    src={slide.desktopSrc}
                    alt={slide.title}
                    className={styles.heroBannerImg}
                  />
                </picture>
                {/* Navigation Arrow Buttons directly on Image */}
                <button
                  className={`${styles.heroNavBtn} ${styles.heroNavPrev}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
                  }}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className={`${styles.heroNavBtn} ${styles.heroNavNext}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
                  }}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={22} />
                </button>

                {/* Mobile-only dots — shows on image when right panel hidden */}
                <div className={styles.mobileHeroDots}>
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`${styles.heroBannerDot} ${currentSlide === i ? styles.activeHeroDot : ""}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: Text Panel — pure CSS, no image */}
              <div
                className={styles.heroBannerRight}
                style={{ background: slide.panelBg }}
              >
                {/* Decorative mandala SVG */}
                <svg className={styles.mandalaBg} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="190" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <circle cx="200" cy="200" r="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
                    <line key={a} x1="200" y1="10" x2="200" y2="390"
                      transform={`rotate(${a} 200 200)`}
                      stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  ))}
                </svg>

                <div className={styles.heroBannerContent}>
                  <span className={styles.heroBannerTag2}
                    style={{ color: slide.accentColor, borderColor: slide.accentColor }}>
                    ✦ {slide.tag}
                  </span>
                  <h2 className={styles.heroBannerHeading}>{slide.title}</h2>
                  <p className={styles.heroBannerItalic}
                    style={{ color: slide.accentColor }}>
                    {slide.subtitle}
                  </p>
                  <p className={styles.heroBannerText}>{slide.desc}</p>
                  <Link href="/shop" className={styles.heroBannerShopBtn}>
                    Shop Collection <ArrowRight size={16} />
                  </Link>
                  <div className={styles.heroBannerTrustRow}>
                    <div className={styles.heroBannerTrustItem}><Leaf size={13} /> Eco Friendly</div>
                    <div className={styles.heroBannerTrustItem}><Shield size={13} /> GOTS Certified</div>
                    <div className={styles.heroBannerTrustItem}><Award size={13} /> 25+ Yrs</div>
                  </div>
                </div>

                {/* Slide dots inside right panel */}
                <div className={styles.heroBannerDots}>
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`${styles.heroBannerDot} ${currentSlide === i ? styles.activeHeroDot : ""}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 2. Trusted Clients & Corporate Partners */}
        <section className={`${styles.brandsSection} ${styles.revealSection}`}>
          <div className="container">
            <div className={styles.sectionHeader} style={{ marginBottom: "20px" }}>
              <span className={styles.subtitle}>Trusted Partners & Deals</span>
              <h2 className={styles.sectionTitle}>Brands We Work With</h2>
              <p className={styles.sectionDesc}>
                Proud supplier of eco-friendly jute bags, corporate packaging & custom jute products to leading companies across India and worldwide.
              </p>
            </div>
          </div>
          <div className={styles.brandsMarqueeWrap}>
            <div className={styles.brandsMarqueeTrack}>
              {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
                <div key={`${brand.name}-${index}`} className={styles.brandLogoCard} title={brand.name}>
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className={styles.brandLogoImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Category Quick Fast-Track Showcase */}
        <section className={`${styles.quickCatSection} ${styles.revealSection}`}>
          <div className="container">
            <div className={styles.quickCatGrid}>
              {QUICK_CATEGORIES.map((cat, i) => (
                <Link key={i} href={cat.link} className={styles.quickCatCard}>
                  <div className={styles.quickCatImageWrap}>
                    <img src={cat.img} alt={cat.title} className={styles.quickCatImg} />
                    <span className={styles.quickCatBadge}>{cat.badge}</span>
                  </div>
                  <div className={styles.quickCatContent}>
                    <span className={styles.quickCatTag}>{cat.tag}</span>
                    <h3 className={styles.quickCatTitle}>{cat.title}</h3>
                    <p className={styles.quickCatSubtitle}>{cat.subtitle}</p>
                    <span className={styles.quickCatBtn}>
                      Explore Collection <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Featured Products Section */}
        <section className={`${styles.featuredSection} ${styles.revealSection} section-padding`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subtitle}>Bestsellers</span>
              <h2 className={styles.sectionTitle}>Featured Artisanal Products</h2>
              <p className={styles.sectionDesc}>
                Explore our hand-selected collection of premium jute goods. Handcrafted by local cooperatives using sustainable, organic fibers.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className={styles.homeFilterTabs}>
              {["All", "Tote Bags", "Shopping Bags", "Lunch & Bottle Bags", "Gift Bags"].map((cat) => (
                <button
                  key={cat}
                  className={`${styles.homeFilterTab} ${filter === cat ? styles.activeHomeFilterTab : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat === "All" ? "Show All" : cat}
                </button>
              ))}
            </div>

            <div className={styles.carouselWrapper}>
              <button
                className={`${styles.scrollBtn} ${styles.scrollLeft}`}
                onClick={() => scroll(artisanalScrollRef, "left")}
                aria-label="Scroll left"
              >
                ‹
              </button>

              <div className={styles.featuredGrid} ref={artisanalScrollRef}>
                {filteredProducts.slice(0, 16).map((product) => (
                  <div
                    key={product.id}
                    className={styles.productCardClean}
                    onClick={() => setEnquiryProduct(product)}
                  >
                    <div className={styles.imageAreaClean}>
                      <span className={styles.topSaleBadge}>
                        {Math.round((((product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)) - product.price) / (product.price === 99 ? 299 : (product.price === 199 ? 399 : 999))) * 100)}% OFF
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImageClean}
                      />
                      <div className={styles.quickViewOverlay}>
                        <span className={styles.quickViewBtn}>Quick View</span>
                      </div>
                    </div>
                    <div className={styles.detailsClean}>
                      <h3 className={styles.cardNameClean}>{product.name}</h3>
                      <span className={styles.priceClean}>
                        <span className={styles.originalPrice}>₹{product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)}</span>
                        ₹{product.price}
                      </span>
                      <div className={styles.ratingClean}>
                        <span className={styles.starsClean}>
                          {"★".repeat(Math.floor(product.rating))}
                          {product.rating % 1 !== 0 ? "½" : ""}
                        </span>
                        <span className={styles.ratingNumClean}>
                          ({product.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Explore More Card */}
                <div className={`${styles.productCardClean} ${styles.exploreMoreCardClean}`}>
                  <Link href="/shop" className={styles.exploreMoreLinkClean}>
                    <ShoppingBag size={36} className={styles.exploreMoreIconClean} />
                    <h3>View All Products</h3>
                    <span>Browse complete catalog</span>
                    <button className={styles.exploreMoreBtnClean}>
                      Go to Shop <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>

              <button
                className={`${styles.scrollBtn} ${styles.scrollRight}`}
                onClick={() => scroll(artisanalScrollRef, "right")}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>

            <div className={styles.centerContainer}>
              <Link href="/shop" className={styles.viewAllBtn}>
                Explore Full Artisanal Shop <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Featured Curing & Raw Materials Section */}
        <section className={`${styles.featuredSection} ${styles.revealSection} section-padding`} style={{ borderTop: "1px solid var(--border-light)", backgroundColor: "var(--background)" }}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subtitle}>Industrial Grade</span>
              <h2 className={styles.sectionTitle}>Featured Curing & Raw Materials</h2>
              <p className={styles.sectionDesc}>
                High-density concrete curing sheets, heavy-duty packing sacks, and eco-friendly burlap rolls directly from production units.
              </p>
            </div>

            <div className={styles.carouselWrapper}>
              <button
                className={`${styles.scrollBtn} ${styles.scrollLeft}`}
                onClick={() => scroll(curingScrollRef, "left")}
                aria-label="Scroll left"
              >
                ‹
              </button>

              <div className={styles.featuredGrid} ref={curingScrollRef}>
                {FEATURED_CURING_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className={styles.productCardClean}
                    onClick={() => setEnquiryProduct(product)}
                  >
                    <div className={styles.imageAreaClean}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImageClean}
                      />
                      <div className={styles.quickViewOverlay}>
                        <span className={styles.quickViewBtn}>Quick View</span>
                      </div>
                    </div>
                    <div className={styles.detailsClean}>
                      <h3 className={styles.cardNameClean}>{product.name}</h3>
                      <span className={styles.priceClean}>
                        <span className={styles.originalPrice}>₹{product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)}</span>
                        ₹{product.price}
                        <span className={styles.discountPercent}>
                          ({Math.round((((product.price === 99 ? 299 : (product.price === 199 ? 399 : 999)) - product.price) / (product.price === 99 ? 299 : (product.price === 199 ? 399 : 999))) * 100)}% off)
                        </span>
                      </span>
                      <div className={styles.ratingClean}>
                        <span className={styles.starsClean}>
                          {"★".repeat(Math.floor(product.rating))}
                        </span>
                        <span className={styles.ratingNumClean}>
                          ({product.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Explore More Card for Curing */}
                <div className={`${styles.productCardClean} ${styles.exploreMoreCardClean}`}>
                  <Link href="/curing" className={styles.exploreMoreLinkClean}>
                    <Package size={36} className={styles.exploreMoreIconClean} />
                    <h3>View All Curing</h3>
                    <span>Explore industrial wraps & rolls</span>
                    <button className={styles.exploreMoreBtnClean}>
                      Go to Curing <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>

              <button
                className={`${styles.scrollBtn} ${styles.scrollRight}`}
                onClick={() => scroll(curingScrollRef, "right")}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>

            <div className={styles.centerContainer}>
              <Link href="/curing" className={styles.viewAllBtn}>
                Explore All Curing Materials <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Dedicated White Laminated Woven Packing Bag Material Section */}
        <section className={`${styles.wovenShowcaseSection} ${styles.revealSection} section-padding`}>
          <div className="container">
            <div className={styles.wovenHeader}>
              <div className={styles.wovenBadgeGroup}>
                <span className={styles.wovenTag}>Feature Material Spotlight</span>
                <span className={styles.wovenTagHighlight}>90 GSM LAMINATED</span>
                <span className={styles.wovenTagUv}>UV STABILIZED</span>
              </div>
              <h2 className={styles.wovenTitle}>White Laminated Woven Packing Bags</h2>
              <p className={styles.wovenSubtitle}>
                Extra-tough, weather-proof white woven sacks designed for heavy packing, flood control sandbags, agricultural grain storage, and construction material logistics.
              </p>
            </div>

            {/* Split Visual & Interactive Estimator Grid */}
            <div className={styles.wovenGrid}>
              {/* Left Column: Visual Showcase & Specifications */}
              <div className={styles.wovenVisualCard}>
                <div className={styles.wovenImageWrap}>
                  <span className={styles.wovenDiscountBadge}>50% OFF • WHOLESALE</span>
                  <img
                    src="/white_woven_bag_detail.png"
                    alt="White Laminated Woven Packing Bag"
                    className={styles.wovenImg}
                  />
                  <div className={styles.wovenPriceTagFloating}>
                    <span className={styles.wovenPriceMain}>₹499</span>
                    <span className={styles.wovenPriceOriginal}>₹999</span>
                    <span className={styles.wovenPricePackLabel}>/ Pack of 25 Bags</span>
                  </div>
                </div>

                <div className={styles.wovenSpecGrid}>
                  <div className={styles.wovenSpecItem}>
                    <span className={styles.wovenSpecLabel}>Dimensions</span>
                    <strong className={styles.wovenSpecValue}>55cm x 95cm</strong>
                  </div>
                  <div className={styles.wovenSpecItem}>
                    <span className={styles.wovenSpecLabel}>Fabric / Density</span>
                    <strong className={styles.wovenSpecValue}>90 GSM (Laminated)</strong>
                  </div>
                  <div className={styles.wovenSpecItem}>
                    <span className={styles.wovenSpecLabel}>Special Feature</span>
                    <strong className={styles.wovenSpecValue}>Water & Dust Resistant</strong>
                  </div>
                  <div className={styles.wovenSpecItem}>
                    <span className={styles.wovenSpecLabel}>Load Capacity</span>
                    <strong className={styles.wovenSpecValue}>Up to 50 kg / Bag</strong>
                  </div>
                </div>

                <div className={styles.wovenSpecFooterAction}>
                  <button
                    className={styles.wovenQuickViewBtn}
                    onClick={() => setEnquiryProduct(WHITE_WOVEN_PRODUCT)}
                  >
                    View Product Specs & Gallery
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Bulk Bag Estimator */}
              <div className={styles.wovenEstimatorCard}>
                <div className={styles.estimatorCardHeader}>
                  <div className={styles.estimatorHeaderIcon}>
                    <Calculator size={24} />
                  </div>
                  <div>
                    <h3 className={styles.estimatorTitle}>Bulk Bag & Cost Estimator</h3>
                    <p className={styles.estimatorSubtitle}>
                      Calculate exact number of bags required for your project weight or volume.
                    </p>
                  </div>
                </div>

                {/* Step 1: Weight Requirement Input */}
                <div className={styles.estimatorInputBlock}>
                  <label className={styles.estimatorLabel}>
                    1. Target Material Weight to Pack (KG):
                  </label>
                  <div className={styles.presetButtonsRow}>
                    {[500, 1000, 2500, 5000, 10000].map((kg) => (
                      <button
                        key={kg}
                        className={`${styles.presetBtn} ${wovenTargetKg === kg ? styles.presetBtnActive : ""}`}
                        onClick={() => setWovenTargetKg(kg)}
                      >
                        {kg >= 1000 ? `${kg / 1000} Ton` : `${kg} kg`}
                      </button>
                    ))}
                  </div>
                  <div className={styles.customInputRow}>
                    <input
                      type="number"
                      min="50"
                      step="50"
                      value={wovenTargetKg}
                      onChange={(e) => setWovenTargetKg(Math.max(1, Number(e.target.value)))}
                      className={styles.estimatorInput}
                      placeholder="Enter custom weight in kg"
                    />
                    <span className={styles.inputUnit}>KG</span>
                  </div>
                </div>

                {/* Step 2: Bag Capacity Selection */}
                <div className={styles.estimatorInputBlock}>
                  <label className={styles.estimatorLabel}>
                    2. Select Weight Capacity per Bag:
                  </label>
                  <div className={styles.capacityRadioGroup}>
                    <button
                      className={`${styles.capacityBtn} ${wovenBagCapacity === 50 ? styles.capacityBtnActive : ""}`}
                      onClick={() => setWovenBagCapacity(50)}
                    >
                      <strong>50 KG / Bag</strong>
                      <span>Heavy Duty Standard</span>
                    </button>
                    <button
                      className={`${styles.capacityBtn} ${wovenBagCapacity === 25 ? styles.capacityBtnActive : ""}`}
                      onClick={() => setWovenBagCapacity(25)}
                    >
                      <strong>25 KG / Bag</strong>
                      <span>Medium Weight Carry</span>
                    </button>
                  </div>
                </div>

                {/* Calculated Results Summary Box */}
                <div className={styles.estimatorResultsBox}>
                  <div className={styles.resultItemBig}>
                    <span className={styles.resultLabel}>Required Bags</span>
                    <strong className={styles.resultValHighlight}>
                      {wovenCalculations.bagsNeeded} Bags
                    </strong>
                    <span className={styles.resultSubtext}>
                      ({wovenCalculations.packsNeeded} Pack{wovenCalculations.packsNeeded > 1 ? "s" : ""} of 25 = {wovenCalculations.totalBags} total bags)
                    </span>
                  </div>

                  <div className={styles.resultItemPrice}>
                    <div>
                      <span className={styles.resultLabel}>Total Factory Wholesale Price</span>
                      <div className={styles.resultPriceRow}>
                        <span className={styles.resultMainPrice}>₹{wovenCalculations.totalCost.toLocaleString("en-IN")}</span>
                        <span className={styles.resultOldPrice}>₹{wovenCalculations.originalTotalCost.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    <span className={styles.savingsPill}>Save ₹{wovenCalculations.totalSavings.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className={styles.estimatorActionGroup}>
                  <a
                    href={`https://wa.me/919968648541?text=${encodeURIComponent(
                      `Hi Ashok Enterprises, I want to order ${wovenCalculations.packsNeeded} Pack(s) (${wovenCalculations.totalBags} Bags) of White Laminated Woven Packing Bags for a total target weight of ${wovenTargetKg}kg. Estimated Total: ₹${wovenCalculations.totalCost}. Please share invoice & dispatch timeline.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.wovenWhatsappBtn}
                  >
                    <MessageCircle size={20} />
                    Order {wovenCalculations.packsNeeded} Pack({wovenCalculations.totalBags} Bags) via WhatsApp
                  </a>

                  <a
                    href="tel:+919968648541"
                    className={styles.wovenCallBtn}
                  >
                    <Phone size={18} />
                    Call Direct: +91 99686 48541
                  </a>
                </div>
              </div>
            </div>

            {/* Industrial Applications Grid */}
            <div className={styles.wovenAppsContainer}>
              <h3 className={styles.wovenAppsTitle}>Tested & Approved For Heavy Industrial Applications</h3>
              <div className={styles.wovenAppsGrid}>
                <div className={styles.wovenAppCard}>
                  <div className={styles.wovenAppIconWrap} style={{ background: "#e0f2fe", color: "#0284c7" }}>
                    <Droplets size={26} />
                  </div>
                  <h4>Flood Control & Sandbags</h4>
                  <p>UV-resistant, high burst pressure bags essential for building emergency sand barriers, erosion defense, and damming.</p>
                </div>

                <div className={styles.wovenAppCard}>
                  <div className={styles.wovenAppIconWrap} style={{ background: "#fef3c7", color: "#d97706" }}>
                    <Layers size={26} />
                  </div>
                  <h4>Construction Rubble & Debris</h4>
                  <p>Heavy-gauge laminated weave prevents punctures from sharp concrete edges, mortar, stone rubble, and tiles.</p>
                </div>

                <div className={styles.wovenAppCard}>
                  <div className={styles.wovenAppIconWrap} style={{ background: "#dcfce7", color: "#16a34a" }}>
                    <Sun size={26} />
                  </div>
                  <h4>Agriculture & Grain Storage</h4>
                  <p>Moisture-proof inner laminate protects stored paddy, wheat, pulses, seeds, and animal feeds against rain and pests.</p>
                </div>

                <div className={styles.wovenAppCard}>
                  <div className={styles.wovenAppIconWrap} style={{ background: "#f3e8ff", color: "#9333ea" }}>
                    <Zap size={26} />
                  </div>
                  <h4>Chemicals, Minerals & Fertilizers</h4>
                  <p>Heavy-duty dust containment for packing powder chemicals, mineral ores, dry fertilizers, and raw industrial batch mix.</p>
                </div>
              </div>
            </div>

            {/* Custom Printing & Branding Banner */}
            <div className={styles.wovenBrandingBanner}>
              <div className={styles.wovenBrandingText}>
                <h4>Need Custom Logo Printing or Bulk Custom Sizes?</h4>
                <p>We manufacture custom flexo-printed white woven sacks with your brand logo, batch codes, and safety details for orders over 100 packs.</p>
              </div>
              <a
                href={`https://wa.me/919968648541?text=${encodeURIComponent(
                  "Hi Ashok Enterprises, I need custom printed White Laminated Woven Packing Bags with my company logo. Please share customization pricing & sample details."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.wovenBrandingBtn}
              >
                Request Custom Printing Quote <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 4. Animated Stats Showcase */}
        <section
          ref={statsRef}
          className={`${styles.statsContainer} ${styles.revealSection}`}
        >
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNum}>{counter1}+</div>
                <div className={styles.statLabel}>Happy Clients</div>
                <div className={styles.statDesc}>Businesses & individuals served pan-India</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNum}>{counter2}T</div>
                <div className={styles.statLabel}>CO2 Absorption</div>
                <div className={styles.statDesc}>Consumes 15 tonnes of CO2 per hectare</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNum}>{counter3} Days</div>
                <div className={styles.statLabel}>Harvest Cycle</div>
                <div className={styles.statDesc}>Rapidly renewable crop</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNum}>{counter4} States</div>
                <div className={styles.statLabel}>Delivery Coverage</div>
                <div className={styles.statDesc}>We ship across all of India</div>
              </div>
            </div>
          </div>
        </section>



        {/* Why Buy From Us — Trust Badges */}
        <section className={`${styles.trustSection} ${styles.revealSection} section-padding`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subtitle}>Our Promise</span>
              <h2 className={styles.sectionTitle}>Why Choose Ashok Enterprises?</h2>
              <p className={styles.sectionDesc}>
                Directly from our family-run manufacturing unit in West Bengal — no compromises on quality, price, or service.
              </p>
            </div>
            <div className={styles.trustGrid}>
              {TRUST_BADGES.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className={styles.trustCard} style={{ "--badge-color": badge.color, "--badge-bg": badge.bg } as React.CSSProperties}>
                    <div className={styles.trustIconWrap}>
                      <Icon size={28} />
                    </div>
                    <h3 className={styles.trustTitle}>{badge.title}</h3>
                    <p className={styles.trustDesc}>{badge.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>




        {/* 9. Customer Testimonials */}
        <section className={`${styles.testimonialsSection} ${styles.revealSection} section-padding`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.subtitle}>What Our Customers Say</span>
              <h2 className={styles.sectionTitle}>Trusted Across India</h2>
              <p className={styles.sectionDesc}>
                Over 500+ happy clients — from home buyers to construction companies. Here's what they say about us.
              </p>
            </div>

            <div className={styles.testimonialsWrapper}>
              <button
                className={styles.testimonialNavBtn}
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} />
              </button>

              <div
                className={styles.testimonialsTrack}
                onTouchStart={handleTestimonialTouchStart}
                onTouchEnd={handleTestimonialTouchEnd}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.id}
                    className={`${styles.testimonialCard} ${i === testimonialIndex ? `${styles.activeTestimonial} ${styles.mobileActiveCard}` : i === (testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length ? styles.prevTestimonial : i === (testimonialIndex + 1) % TESTIMONIALS.length ? styles.nextTestimonial : styles.hiddenTestimonial}`}
                  >
                    <div className={styles.testimonialQuoteIcon}>
                      <Quote size={20} />
                    </div>
                    <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                    <div className={styles.testimonialStars}>
                      {"★".repeat(t.rating)}
                    </div>
                    <div className={styles.testimonialFooter}>
                      <div
                        className={styles.testimonialAvatar}
                        style={{ backgroundColor: t.avatarColor }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className={styles.testimonialName}>{t.name}</div>
                        <div className={styles.testimonialMeta}>
                          <MapPin size={12} /> {t.city} &nbsp;·&nbsp; {t.product}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={styles.testimonialNavBtn}
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Dots */}
            <div className={styles.testimonialDots}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.testimonialDot} ${i === testimonialIndex ? styles.activeTestimonialDot : ""}`}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>


        {/* 11. Bold CTA WhatsApp Banner */}
        <section className={`${styles.ctaBanner} ${styles.revealSection}`}>
          <div className={styles.ctaBannerBg} />
          <div className="container">
            <div className={styles.ctaContent}>
              <div className={styles.ctaLeft}>
                <span className={styles.ctaTag}>🌱 Eco-Friendly & Affordable</span>
                <h2 className={styles.ctaTitle}>
                  Get Exclusive Bulk Pricing &<br />
                  <span className={styles.ctaTitleAccent}>Free Product Samples</span>
                </h2>
                <p className={styles.ctaDesc}>
                  Join 500+ businesses who order directly from us. WhatsApp us your requirements and get a quote within 30 minutes — no middlemen, no markup.
                </p>
                <div className={styles.ctaButtons}>
                  <a
                    href="https://wa.me/919968648541?text=Hi,%20I%20want%20to%20enquire%20about%20bulk%20jute%20products%20and%20pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaWhatsappBtn}
                  >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </a>
                  <a href="tel:+919968648541" className={styles.ctaCallBtn}>
                    <Phone size={20} />
                    Call Now
                  </a>
                </div>
              </div>
              <div className={styles.ctaRight}>
                <div className={styles.ctaImageCard}>
                  <img src="/jute_bags.png" alt="Premium Jute Products" className={styles.ctaImage} />
                </div>
                <div className={styles.ctaFeatures}>
                  {["Direct Factory Price", "Min. 50 Units MOQ", "Custom Branding", "GOTS Certified"].map((f, i) => (
                    <div key={i} className={styles.ctaFeatureItem}>
                      <CheckCircle size={15} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      {/* Enquiry Contact Modal */}
      {enquiryProduct && (
        <div className={styles.modalOverlay} onClick={() => setEnquiryProduct(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setEnquiryProduct(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className={styles.modalContent}>
              <div className={styles.modalImageContainer}>
                <div className={styles.modalImage}>
                  <img
                    src={activeImage || enquiryProduct.image}
                    alt={enquiryProduct.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
                  />
                </div>
                {enquiryProduct.images && enquiryProduct.images.length > 1 && (
                  <div className={styles.modalThumbnails}>
                    {enquiryProduct.images.map((imgUrl: string) => (
                      <button
                        key={imgUrl}
                        className={`${styles.thumbnailBtn} ${activeImage === imgUrl ? styles.activeThumbnail : ""
                          }`}
                        onClick={() => setActiveImage(imgUrl)}
                      >
                        <img
                          src={imgUrl}
                          alt={`${enquiryProduct.name} thumbnail`}
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "2px" }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.modalInfo}>
                <span className={styles.modalCategoryBadge}>
                  {enquiryProduct.category}
                </span>
                <h2 className={styles.modalTitle}>{enquiryProduct.name}</h2>
                <div className={styles.modalRatingRow}>
                  <span className={styles.stars}>
                    {"★".repeat(Math.floor(enquiryProduct.rating))}
                  </span>
                  <span>
                    {enquiryProduct.rating} ({enquiryProduct.reviews} Verified Reviews)
                  </span>
                </div>

                <p className={styles.modalDesc}>{enquiryProduct.description}</p>

                <div className={styles.modalBadges}>
                  <span className={styles.modalBadge}>🌿 {enquiryProduct.material.split(",")[0]}</span>
                  <span className={styles.modalBadge}>📍 {enquiryProduct.origin}</span>
                  <span className={styles.modalBadge}>📏 {enquiryProduct.dimensions}</span>
                </div>

                <div className={styles.modalPriceRow}>
                  <div className={styles.modalPriceGroup}>
                    <span className={styles.modalPrice}>₹{enquiryProduct.price.toLocaleString("en-IN")}</span>
                    <span className={styles.originalPriceLg}>₹{enquiryProduct.price === 99 ? 299 : (enquiryProduct.price === 199 ? 399 : 999)}</span>
                    <span className={styles.discountBadgeLg}>
                      {Math.round((((enquiryProduct.price === 99 ? 299 : (enquiryProduct.price === 199 ? 399 : 999)) - enquiryProduct.price) / (enquiryProduct.price === 99 ? 299 : (enquiryProduct.price === 199 ? 399 : 999))) * 100)}% OFF
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
                      href={`https://wa.me/919968648541?text=Hi,%20I%20am%20interested%20in%20ordering%20"${enquiryProduct.name}"%20(Price:%20₹${enquiryProduct.price})`}
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
