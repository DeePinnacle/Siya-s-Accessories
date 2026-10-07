import type { Testimonial, TrustItem } from "@/types/testimonials";

export const testimonials: Testimonial[] = [
    {
        id: "amara-d",
        quote:
            "Siya’s Accessories never disappoints! The quality is top notch, and the pieces are even more beautiful in person. I’ve already placed my second order!",
        name: "Amara D.",
        location: "Lokoja, Kogi State",
        rating: 5,
        avatar: { src: "/Amara.png", alt: "Portrait of Amara D." },
        product: { src: "/gold-earrings.png", alt: "Gold textured hoop earrings" },
    },
    {
        id: "blessing-o",
        quote:
            "I absolutely love the variety and style. The bracelets and necklaces I got are so classy and go with everything. Plus, the customer service is amazing!",
        name: "Blessing O.",
        location: "Abuja, FCT",
        rating: 5,
        avatar: { src: "/Sarah.png", alt: "Portrait of Blessing O." },
        product: { src: "/gold-necklace.png", alt: "Gold clover pendant necklace" },
    },
    {
        id: "Mike",
        quote:
            "Fast response, beautiful products, and such a trustworthy brand. Siya’s Accessories has become my go-to for all my fashion needs!",
        name: "Mike",
        location: "Kano, Kano State",
        rating: 5,
        avatar: { src: "/Mike.png", alt: "Portrait of Hauwa M." },
        product: { src: "/black-rings.png", alt: "Black rings" },
    },
    {
        id: "fatima-a",
        quote:
            "The pieces I ordered from Siya’s Accessories were exactly what I needed. Beautiful designs, affordable prices, and the details are amazing. I’ll definitely be ordering again!",
        name: "Fatima A.",
        location: "Kaduna, Kaduna State",
        rating: 5,
        avatar: { src: "/Fatima.jpg", alt: "Portrait of Fatima A." },
        product: { src: "/black-bracelets.png", alt: "Elegant gold bracelet set" },
    },
    {
        id: "sarah-k",
        quote:
            "I was impressed by how smooth the ordering process was. The accessories looked even better when I received them, and they added the perfect touch to my outfit.",
        name: "Sarah K.",
        location: "Lagos, Lagos State",
        rating: 5,
        avatar: { src: "/Sarah.png", alt: "Portrait of Sarah K." },
        product: { src: "/hair.png", alt: "Fashion necklace and earrings set" },
    },
    {
        id: "zainab-y",
        quote:
            "Siya’s Accessories has such a lovely collection. The styles are trendy, easy to wear, and the customer service made my shopping experience enjoyable.",
        name: "Zainab Y.",
        location: "Ilorin, Kwara State",
        rating: 5,
        avatar: { src: "/Zainab.jpg", alt: "Portrait of Zainab Y." },
        product: { src: "/waistbeads.png", alt: "Pearl hair accessory collection" },
    },
];

export const trustItems: TrustItem[] = [
    { id: "quality", title: "Trendy & Quality", description: "Fashion accessories you’ll love" },
    { id: "trusted", title: "Trusted by Many", description: "Happy customers, always" },
    { id: "ordering", title: "Easy Ordering", description: "Just a WhatsApp message away" },
    { id: "style", title: "Style for Every You", description: "Because you deserve the best" },
];