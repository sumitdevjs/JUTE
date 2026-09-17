"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, ArrowLeft, ShieldCheck, QrCode, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./checkout.module.css";

export default function Checkout() {
  const { cart, cartTotal, clearCart, addToCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");
  const [isPlaced, setIsPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isLocal, setIsLocal] = useState<boolean | null>(null);

  // Security check: Only allow localhost access, block live production users
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local");
      setIsLocal(isLocalhost);
      if (!isLocalhost) {
        // Redirect to shop if someone accesses this on public production URL
        window.location.replace("/shop");
      }
    }
  }, []);

  const handleLoadSampleItems = () => {
    addToCart({
      id: "prod-botanical-floral-canvas-set",
      name: "Botanical Floral Garden Canvas Tote Bags (Set of 4)",
      price: 299,
      image: "/botanical_floral_canvas_tote.jpg",
      category: "Tote Bags",
    });
    addToCart({
      id: "prod-eco-friendly-leaves-tote",
      name: "Eco Friendly Botanical Leaves Jute Tote Bag",
      price: 199,
      image: "/eco_friendly_leaves_jute_bag.jpg",
      category: "Tote Bags",
    });
  };
  
  // Form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNum: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    const newOrderId = `GF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setIsPlaced(true);
  };

  const handleFinish = () => {
    clearCart();
    // Success will redirect to shop
  };

  // Pricing calculations
  const shipping = cartTotal > 1000 ? 0 : 150;
  const finalTotal = cartTotal + shipping;

  // Block live public access
  if (isLocal === false) {
    return null;
  }

  if (isPlaced) {
    return (
      <section className="section-padding">
        <div className="container">
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={44} />
            </div>
            <h1 className={styles.successTitle}>Order Placed!</h1>
            <p className={styles.successDesc}>
              Thank you for choosing Ashok Enterprises. Your organic jute products are being compiled by the artisans.
            </p>

            <div className={styles.receipt}>
              <h3 className={styles.receiptTitle}>Order Receipt ({orderId})</h3>
              <div className={styles.receiptRow}>
                <span>Customer Name:</span>
                <strong>{formData.name}</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>Shipping Address:</span>
                <strong>{formData.address}, {formData.city} - {formData.zip}</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>Payment Method:</span>
                <strong style={{ textTransform: "uppercase" }}>{paymentMethod}</strong>
              </div>
              <div style={{ margin: "12px 0", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.receiptRow} style={{ marginBottom: "6px" }}>
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className={styles.receiptRow}>
                <span>Subtotal:</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.receiptRow}>
                <span>Shipping Fee:</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className={styles.receiptTotal}>
                <span>Total Amount Paid:</span>
                <span>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", opacity: 0.7, fontStyle: "italic" }}>
              A confirmation email and tracking link have been dispatched to {formData.email}.
            </p>

            <Link href="/shop" onClick={handleFinish} className={styles.homeBtn}>
              Back to Store
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="section-padding" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "28px 24px", marginBottom: "24px", boxShadow: "0 4px 16px rgba(34, 197, 94, 0.08)" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#15803d", textTransform: "uppercase", letterSpacing: "1px" }}>
              🔒 Local Owner / Developer Mode
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", margin: "10px 0 8px", color: "#14532d" }}>
              Checkout Page (Local Access Only)
            </h2>
            <p style={{ opacity: 0.85, fontSize: "0.92rem", marginBottom: "20px", lineHeight: "1.5" }}>
              Yeh page sirf aapke local environment (localhost) par khulega. Live site par visitors ko ye access nahi hoga.
            </p>
            <button
              onClick={handleLoadSampleItems}
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "9999px",
                fontWeight: "700",
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(46, 90, 39, 0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              ⚡ Load Sample Products to Test Checkout
            </button>
          </div>

          <Link href="/shop" className={styles.homeBtn} style={{ opacity: 0.8 }}>
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.checkoutPage} section-padding`}>
      <div className="container">
        {/* Local Developer Mode Notice */}
        <div style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "10px",
          padding: "10px 18px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          fontSize: "0.85rem"
        }}>
          <span style={{ color: "#15803d", fontWeight: "600" }}>
            🔒 Local Owner Mode: Checkout is active on localhost only.
          </span>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleLoadSampleItems}
              style={{ background: "#dcfce7", color: "#15803d", border: "1px solid #86efac", padding: "4px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "0.8rem" }}
            >
              + Add Sample Product
            </button>
            <button
              onClick={clearCart}
              style={{ background: "#fee2e2", color: "#b91c1c", border: "1px solid #fca5a5", padding: "4px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "0.8rem" }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: "24px" }}>
          <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--primary)" }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        <div className={styles.layout}>
          {/* 1. Checkout Form */}
          <form className={styles.formBox} onSubmit={handleSubmit}>
            <div>
              <h2 className={styles.sectionTitle} style={{ border: "none", margin: "0", padding: "0" }}>1. Shipping Information</h2>
              <div className={styles.formGrid} style={{ marginTop: "20px" }}>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={styles.input}
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className={styles.input}
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    className={styles.input}
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat / House no., Colony, Area"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Town / City</label>
                  <input
                    type="text"
                    name="city"
                    className={styles.input}
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Kolkata"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>ZIP / PIN Code</label>
                  <input
                    type="text"
                    name="zip"
                    className={styles.input}
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="6-digit PIN"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "12px" }}>
              <h2 className={styles.sectionTitle} style={{ border: "none", margin: "0", padding: "0" }}>2. Payment Selection</h2>
              <div className={styles.paymentGrid}>
                {/* Credit Card */}
                <div
                  className={`${styles.paymentOption} ${paymentMethod === "card" ? styles.paymentOptionSelected : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className={styles.radioInput}
                  />
                  <CreditCard size={20} style={{ color: "var(--primary)" }} />
                  <div className={styles.paymentDetails}>Credit / Debit Card</div>
                </div>

                {/* UPI */}
                <div
                  className={`${styles.paymentOption} ${paymentMethod === "upi" ? styles.paymentOptionSelected : ""}`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className={styles.radioInput}
                  />
                  <QrCode size={20} style={{ color: "var(--primary)" }} />
                  <div className={styles.paymentDetails}>UPI (Paytm/GPay/PhonePe)</div>
                </div>

                {/* Cash on Delivery */}
                <div
                  className={`${styles.paymentOption} ${paymentMethod === "cod" ? styles.paymentOptionSelected : ""}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className={styles.radioInput}
                  />
                  <Truck size={20} style={{ color: "var(--primary)" }} />
                  <div className={styles.paymentDetails}>Cash on Delivery (COD)</div>
                </div>
              </div>

              {/* Payment Fields conditional rendering */}
              <div style={{ minHeight: "100px" }}>
                {paymentMethod === "card" && (
                  <div className={styles.paymentFields}>
                    <div className={styles.formGroupFull}>
                      <label className={styles.label}>Card Number</label>
                      <input
                        type="text"
                        name="cardNum"
                        className={styles.input}
                        required={paymentMethod === "card"}
                        placeholder="16-digit card number"
                        value={formData.cardNum}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          className={styles.input}
                          required={paymentMethod === "card"}
                          placeholder="MM / YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>CVV</label>
                        <input
                          type="password"
                          name="cardCvv"
                          className={styles.input}
                          required={paymentMethod === "card"}
                          placeholder="3 digits"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className={styles.paymentFields}>
                    <div className={styles.formGroupFull}>
                      <label className={styles.label}>UPI Virtual ID</label>
                      <input
                        type="text"
                        name="upiId"
                        className={styles.input}
                        required={paymentMethod === "upi"}
                        placeholder="e.g. mobile@upi"
                        value={formData.upiId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className={styles.paymentFields}>
                    <p style={{ fontSize: "0.9rem", opacity: 0.8, backgroundColor: "var(--background)", padding: "16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
                      📦 Please pay the delivery executive in cash upon receiving your jute products. Standard COD verification fee may apply.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} style={{ marginTop: "16px" }}>
              Place Order & Secure Pay
            </button>
          </form>

          {/* 2. Order Summary Sidebar */}
          <aside className={styles.summaryBox}>
            <h3 className={styles.sectionTitle} style={{ border: "none", margin: "0", padding: "0" }}>Order Summary</h3>
            
            <div className={styles.summaryItemsList} style={{ marginTop: "24px" }}>
              {cart.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.itemLabel}>
                    <div className={styles.itemImage}>
                      {item.image.startsWith("/") ? (
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
                      ) : (
                        item.image
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600" }}>{item.name}</div>
                      <span className={styles.itemCount}>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <strong style={{ flexShrink: 0 }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "16px" }}>
              <div className={styles.costRow}>
                <span>Basket Subtotal</span>
                <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
              </div>
              <div className={styles.costRow}>
                <span>Shipping Fee</span>
                <strong>{shipping === 0 ? "FREE" : `₹${shipping}`}</strong>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Grand Total</span>
                <span className={styles.totalValue}>₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", fontSize: "0.85rem", opacity: 0.8, borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
              <ShieldCheck size={28} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <div>
                <strong>Secure Payment Guarantee</strong>
                <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>All purchases are fully encrypted. Returns are accepted within 15 days in original tags.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
