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
  whatsappNumber: "8801712555715",
  facebookUrl: "https://www.facebook.com/share/1ByiZNceLK/",
  phone: "01712555715",
  email: "arentertainment.syl.bd@gmail.com",
  address: "Westend Market (Shop No. 5/6) Fenchuganj Road, Kodomtoli, Sylhet",
  defaultWhatsappMessage: "Hello AR Entertainment, I am interested in your jersey designs.",
};

/**
 * Build a WhatsApp deep link with an optional jersey name inserted into the
 * pre-filled message.
 */
export function getWhatsAppLink(_jerseyName?: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}`;
}

export function getFacebookLink(): string {
  return siteConfig.facebookUrl;
}
