"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./SidebarCart.module.css";

const SidebarCart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart sidebar */}
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isCartOpen ? styles.sidebarOpen : ""}`}
        aria-modal="true"
        role="dialog"
        data-lenis-prevent
      >
        <div className={styles.cartHeader}>
          <h2>Your Cart</h2>
          <button
            className={styles.closeButton}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.itemsContainer}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={64} className={styles.emptyIcon} />
              <p>Your shopping cart is empty.</p>
              <button
                className={styles.shopButton}
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/shop");
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  {item.image.startsWith("/") ? (
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
                  ) : (
                    item.image
                  )}
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                  <div className={styles.itemControls}>
                    <div className={styles.quantitySelector}>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Delete item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalValue}>
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Proceed to Buy
            </button>
            <button
              className={styles.continueShopping}
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarCart;
