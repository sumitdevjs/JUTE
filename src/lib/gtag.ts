// Google Ads & Analytics tracking utility for Ashok Enterprises
export const GOOGLE_ADS_ID = "AW-18379389647";
export const PURCHASE_CONVERSION_ID = "AW-18379389647/Lsr6CLjUzd4cEM_1_LtE";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track Purchase Conversion for Google Ads
 */
export const trackPurchaseConversion = (
  orderId: string,
  value: number,
  items: Array<{ id?: string; name?: string; price?: number; quantity?: number }> = []
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // Official Google Ads Purchase Conversion Event
    window.gtag("event", "conversion", {
      send_to: PURCHASE_CONVERSION_ID,
      transaction_id: orderId,
      value: value,
      currency: "INR",
    });

    // Standard E-commerce Purchase Event
    window.gtag("event", "purchase", {
      transaction_id: orderId,
      value: value,
      currency: "INR",
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    });
  }
};

/**
 * Send custom event to Google Ads / Google Tag
 */
export const trackGoogleEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      send_to: GOOGLE_ADS_ID,
      ...parameters,
    });
  }
};

/**
 * Track WhatsApp Inquiries as Google Ads Conversions / Leads
 */
export const trackWhatsAppClick = (source: string, extraDetails?: Record<string, any>) => {
  trackGoogleEvent("conversion", {
    event_category: "Lead",
    event_label: `WhatsApp - ${source}`,
    ...extraDetails,
  });
  
  // Also track as standard Google Analytics / Ads lead event
  trackGoogleEvent("generate_lead", {
    currency: "INR",
    value: extraDetails?.value || 1,
    lead_source: "WhatsApp",
    lead_location: source,
  });
};

/**
 * Track Direct Phone Call clicks
 */
export const trackPhoneClick = (source: string) => {
  trackGoogleEvent("conversion", {
    event_category: "Lead",
    event_label: `Call Direct - ${source}`,
  });

  trackGoogleEvent("contact", {
    method: "Phone",
    source: source,
  });
};

/**
 * Track Bulk Quotation or Calculator submissions
 */
export const trackQuoteSubmission = (formName: string, details?: Record<string, any>) => {
  trackGoogleEvent("conversion", {
    event_category: "Lead",
    event_label: `Quote - ${formName}`,
    ...details,
  });

  trackGoogleEvent("generate_lead", {
    lead_source: formName,
    ...details,
  });
};
