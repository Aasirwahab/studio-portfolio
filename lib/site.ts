export const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "STUDIO", href: "/features" },
  { label: "WORK", href: "/product" },
  { label: "VOICES", href: "/testimonial" },
  { label: "CONTACT", href: "/contact" },
] as const;

export const SOCIALS = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
  { label: "PINTEREST", href: "https://pinterest.com" },
] as const;

export const COMPANY = {
  name: "Atelier Nord",
  // Wordmark split across two lines where the logo needs it
  nameLines: ["Atelier", "Nord"],
  tagline: "Brand, Campaign & Editorial",
  email: "studio@ateliernord.com",
  phone: "+1 (212) 555-0148",
  address: "88 Wooster Street, SoHo, New York",
} as const;
