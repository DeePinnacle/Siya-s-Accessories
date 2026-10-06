import { Navbar } from "@/components/site-chrome/Navbar";
import { Hero } from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProduct";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Categories />
        <FeaturedProducts />
      </main>
    </>
  );
}