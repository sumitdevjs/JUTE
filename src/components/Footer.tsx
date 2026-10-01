"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, Send, Factory, Truck, Leaf, ShieldCheck } from "lucide-react";
import styles from "./Footer.module.css";

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

import { trackWhatsAppClick, trackPhoneClick, trackQuoteSubmission } from "@/lib/gtag";

const Footer: React.FC = () => {
  const [quickQuoteText, setQuickQuoteText] = useState("");

  const handleWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    trackQuoteSubmission("Footer Bulk Quote Form", { inquiry: quickQuoteText.trim() });
    const message = quickQuoteText.trim()
      ? `Hi Ashok Enterprises, I have a custom inquiry: ${quickQuoteText.trim()}`
      : "Hi Ashok Enterprises, I would like to request a bulk wholesale price list.";
    window.open(`https://wa.me/919968648541?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <footer className={styles.footer}>
      {/* Top Feature & Trust Strip */}
      <div className={styles.trustStrip}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <Factory size={22} />
              </div>
              <div>
                <strong>Direct Manufacturer</strong>
                <span>Wholesale factory pricing</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <Truck size={22} />
              </div>
              <div>
                <strong>Pan-India Shipping</strong>
                <span>Fast dispatch to all 28 states</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <Leaf size={22} />
              </div>
              <div>
                <strong>100% Eco-Certified</strong>
                <span>Biodegradable & GOTS Jute</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconWrap}>
                <MessageCircle size={22} />
              </div>
              <div>
                <strong>24/7 WhatsApp Support</strong>
                <span>Live sales & sample desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "48px" }}>
        <div className={styles.grid}>
          {/* Col 1: Brand & Contact Info */}
          <div className={styles.col}>
            <Link href="/" className={styles.brand}>
              <img src="/brand_logo_final.png" alt="Ashok Enterprises Logo" className={styles.brandLogoImage} />
              Ashok<span className={styles.brandSpan}>Enterprises</span>
            </Link>
            <p className={styles.description}>
              Leading manufacturer & bulk supplier of organic jute tote bags, high-density concrete curing sheets, burlap hessian rolls, and white polypropylene woven packing sacks.
            </p>

            <div className={styles.contactList}>
              <a
                href="tel:+919968648541"
                className={styles.contactItem}
                onClick={() => trackPhoneClick("Footer Contact List")}
              >
                <Phone size={16} />
                <span>+91 99686 48541</span>
              </a>

              <a
                href="https://wa.me/919968648541?text=Hi%20Ashok%20Enterprises,%20I%20want%20to%20inquire%20about%20bulk%20wholesale%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItemWhatsapp}
                onClick={() => trackWhatsAppClick("Footer Chat Desk")}
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp Desk</span>
              </a>

              <a
                href="https://www.instagram.com/borevaala/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItemInstagram}
              >
                <InstagramIcon size={16} />
                <span>Follow @borevaala on Instagram</span>
              </a>

              <div className={styles.contactItemInfo}>
                <Clock size={16} />
                <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product Catalog Links */}
          <div className={styles.col}>
            <h3 className={styles.title}>Product Catalog</h3>
            <ul className={styles.links}>
              <li>
                <Link href="/shop" className={styles.link}>
                  Artisanal Tote & Shopping Bags
                </Link>
              </li>
              <li>
                <Link href="/curing" className={styles.link}>
                  Concrete Curing Jute Sheets
                </Link>
              </li>
              <li>
                <Link href="/polypropylene" className={styles.link}>
                  PP Woven Packing Bags & Sandbags
                </Link>
              </li>
              <li>
                <Link href="/curing" className={styles.link}>
                  Burlap Hessian Cloth Rolls
                </Link>
              </li>
              <li>
                <Link href="/curing" className={styles.link}>
                  Bulk Gunny & Sacking Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Instant Bulk WhatsApp Quote Box */}
          <div className={styles.col}>
            <h3 className={styles.title}>Get Instant Bulk Quote</h3>
            <p className={styles.quoteDesc}>
              Enter your bag requirement or target quantity to receive factory wholesale rates directly on WhatsApp.
            </p>
            <form onSubmit={handleWhatsAppQuote} className={styles.quoteForm}>
              <textarea
                value={quickQuoteText}
                onChange={(e) => setQuickQuoteText(e.target.value)}
                placeholder="e.g. Need 500 pcs Concrete Curing Sheets or 1,000 PP Woven Bags..."
                className={styles.quoteInput}
                rows={3}
              />
              <button type="submit" className={styles.quoteSubmitBtn}>
                <Send size={16} /> Get WhatsApp Quote
              </button>
            </form>
          </div>

          {/* Col 4: Locate Us & Google Map */}
          <div className={styles.col}>
            <h3 className={styles.title}>Locate Us</h3>
            <div className={styles.mapCard}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.6384383537816!2d77.25213111137451!3d28.691652081291405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3002e650a9%3A0xd3d3be2377573586!2zQXNob3JlIEVudGVycHJpc2VzIGp1dGUgJiBCYWcgKOCkrOCli-CksOClhyDgpLXgpL7gpLLgpL4p!5e1!3m2!1sen!2sin!4v1781465655771!5m2!1sen!2sin"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: "10px", width: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ashok Enterprises Location"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ashok+Enterprises+Jute+%26+Bag"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapDirectionsBtn}
              >
                <MapPin size={14} /> Open Directions in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <div className={styles.copyrightRow}>
            <p>© {new Date().getFullYear()} Ashok Enterprises. All rights reserved.</p>
            <span className={styles.gstTag}>
              <ShieldCheck size={14} /> GST Certified • 100% Quality Guaranteed
            </span>
            <a
              href="https://www.instagram.com/borevaala/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIgLink}
            >
              <InstagramIcon size={14} /> @borevaala
            </a>
          </div>

          {/* Payment Methods */}
          <div className={styles.paymentMethods}>
            <span className={styles.paymentLabel}>We Accept</span>
            <div className={styles.paymentIcons}>
              {/* Visa */}
              <div className={styles.paymentIcon} title="Visa">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <path d="M19.5 21h-3.2l2-12.5h3.2L19.5 21z" fill="#00579F" />
                  <path d="M31.2 8.8c-.6-.3-1.6-.5-2.8-.5-3.1 0-5.3 1.6-5.3 4 0 1.7 1.6 2.7 2.8 3.3 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.6c.7.3 2.1.6 3.5.6 3.3 0 5.4-1.6 5.4-4.1 0-1.4-.8-2.4-2.7-3.3-1.1-.6-1.8-.9-1.8-1.5 0-.5.6-1 1.8-1 1 0 1.8.2 2.4.5l.3.1.4-2.6z" fill="#00579F" />
                  <path d="M35.7 8.5h-2.4c-.7 0-1.3.2-1.6 1L27.5 21h3.3l.7-1.8h4l.4 1.8H39L35.7 8.5zm-3.5 8.2l1.7-4.5.4 4.5h-2.1z" fill="#00579F" />
                  <path d="M14.6 8.5L11.5 17l-.3-1.7c-.6-1.9-2.4-4-4.5-5l2.8 10.7h3.3l5-12.5h-3.2z" fill="#00579F" />
                  <path d="M9.2 8.5H4.1l-.1.3c3.9 1 6.5 3.4 7.6 6.2l-1.1-5.5c-.2-.8-.7-1-1.3-1z" fill="#FAA61A" />
                </svg>
              </div>
              {/* Mastercard */}
              <div className={styles.paymentIcon} title="Mastercard">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <circle cx="19" cy="16" r="8" fill="#EB001B" />
                  <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                  <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00" />
                </svg>
              </div>
              {/* UPI */}
              <div className={styles.paymentIcon} title="UPI">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <text x="24" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#4CAF50">UPI</text>
                </svg>
              </div>
              {/* RuPay */}
              <div className={styles.paymentIcon} title="RuPay">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <text x="24" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8" fill="#097252">RuPay</text>
                </svg>
              </div>
              {/* Google Pay */}
              <div className={styles.paymentIcon} title="Google Pay">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <text x="24" y="14" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="6" fill="#5f6368">Google</text>
                  <text x="24" y="23" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7" fill="#4285F4">Pay</text>
                </svg>
              </div>
              {/* Paytm */}
              <div className={styles.paymentIcon} title="Paytm">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <text x="24" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="9" fill="#00BAF2">Paytm</text>
                </svg>
              </div>
              {/* PhonePe */}
              <div className={styles.paymentIcon} title="PhonePe">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <text x="24" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7" fill="#5F259F">PhonePe</text>
                </svg>
              </div>
              {/* Cash on Delivery */}
              <div className={styles.paymentIcon} title="Cash on Delivery">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1" />
                  <text x="24" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7" fill="#2E5A27">COD</text>
                  <text x="24" y="23" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="5" fill="#666">Cash</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
