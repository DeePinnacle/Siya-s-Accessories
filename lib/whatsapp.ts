import { siteConfig } from "@/data/site";

export const messages = {
  general: `Hello ${siteConfig.name}, I'd like to make an enquiry.`,
  product: (name: string) => `Hello ${siteConfig.name}, I'm interested in ordering the ${name}.`,
  restock: (name: string) => `Hello ${siteConfig.name}, I'd like to ask about the ${name}. When will it be available?`,
};

export function buildWhatsAppUrl(message: string = messages.general) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export const telUrl = () => `tel:${siteConfig.phoneTel}`;
export const mailUrl = () => `mailto:${siteConfig.email}?subject=${encodeURIComponent("Enquiry from website")}`;

export function generalEnquiryMessage() {
  return "Hello Siya's Accessories, I'd like to make an enquiry.";
}

export const whatsappMessages = {
  general: () => `Hello ${siteConfig.name}, I'd like to make an enquiry.`,
  product: (productName: string) =>
    `Hello ${siteConfig.name}, I'm interested in ordering the ${productName}.`,
  restock: (productName: string) =>
    `Hello ${siteConfig.name}, I'd like to ask about the ${productName}. When will it be available?`,
};