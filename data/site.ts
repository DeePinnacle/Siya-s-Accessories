export const siteConfig = {
  name: "Siya's Accessories",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: "2349061793607",
  phoneDisplay: "0906 179 3607",
  phoneTel: "+2349061793607",
  email: "haseeyarh58@gmail.com",
  location: "Lokoja, Kogi State, Nigeria",
  socials: [] as { platform: string; url: string }[], // O5: render only entries with a URL
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];