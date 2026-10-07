import { Navbar } from "@/components/site-chrome/Navbar";
import { Hero } from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProduct";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { About } from "@/components/sections/About";
import { WhyChoose } from "@/components/sections/WhyChooseUs";
import { HowToOrder } from "@/components/sections/HowToOrder";
import Testimonials from "@/components/sections/Testimonials";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Categories />
        <TrustBanner />
        <FeaturedProducts />
        <About />
        <WhyChoose />
        <HowToOrder />
        <Testimonials />
      </main>
    </>
  );
}