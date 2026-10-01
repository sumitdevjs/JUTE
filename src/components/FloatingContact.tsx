"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, MessageSquare, X } from "lucide-react";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/gtag";
import styles from "./FloatingContact.module.css";

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "+919968648541";
  const formattedPhone = "+91 99686 48541";
  const whatsappUrl = `https://wa.me/919968648541?text=Hi,%20I%20am%20interested%20in%20ordering%20Jute%20products.`;

  return (
    <div className={styles.floatingContainer}>
      {/* Expanded Menu Options */}
      <div className={`${styles.menuOptions} ${isOpen ? styles.menuOpen : ""}`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.optionItem}
          onClick={() => {
            trackWhatsAppClick("Floating Contact Widget");
            setIsOpen(false);
          }}
        >
          <span className={`${styles.iconWrapper} ${styles.whatsappBg}`}>
            <MessageCircle size={18} />
          </span>
          <span className={styles.optionText}>WhatsApp Us</span>
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className={styles.optionItem}
          onClick={() => {
            trackPhoneClick("Floating Contact Widget");
            setIsOpen(false);
          }}
        >
          <span className={`${styles.iconWrapper} ${styles.phoneBg}`}>
            <Phone size={18} />
          </span>
          <span className={styles.optionText}>Call Direct</span>
        </a>
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.triggerButton} ${isOpen ? styles.activeTrigger : ""}`}
        aria-label="Contact Ashok Enterprises"
        title="Contact Us"
      >
        <span className={styles.pulseRing}></span>
        <span className={styles.pulseRing2}></span>
        
        {isOpen ? (
          <X size={22} className={styles.iconRotate} />
        ) : (
          <MessageSquare size={22} className={styles.iconBounce} />
        )}
      </button>
    </div>
  );
};

export default FloatingContact;
