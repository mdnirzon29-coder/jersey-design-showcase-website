// ============================================================================
// CENTRAL SITE CONFIGURATION
// ----------------------------------------------------------------------------
// Change brand info, contact numbers and social links from this single file.
// Nothing else in the codebase should hard-code these values.
// ============================================================================

export interface SiteConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsappNumber: string; // international format, digits only, e.g. "919876543210"
  facebookUrl: string;
  phone: string;
  email: string;
  address: string;
  defaultWhatsappMessage: string;
}

export const siteConfig: SiteConfig = {
  brandName: "AR Entertainment",
  shortName: "AR",
  tagline: "Premium Jersey Design Showcase",
  description:
    "AR Entertainment specializes in custom sports jersey design — cricket, football, badminton and more. Explore our design catalog and get in touch to bring your team's jersey to life.",
  whatsappNumber: "919999999999",
  facebookUrl: "https://facebook.com/arentertainment",
  phone: "+91 99999 99999",
  email: "info@arentertainment.com",
  address: "Design Studio, Sports Avenue, India",
  defaultWhatsappMessage: "Hello AR Entertainment, I am interested in your jersey designs.",
};

/**
 * Build a WhatsApp deep link with an optional jersey name inserted into the
 * pre-filled message.
 */
export function getWhatsAppLink(jerseyName?: string): string {
  const message = jerseyName
    ? `Hello AR Entertainment, I am interested in the ${jerseyName} design.`
    : siteConfig.defaultWhatsappMessage;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function getFacebookLink(): string {
  return siteConfig.facebookUrl;
}
