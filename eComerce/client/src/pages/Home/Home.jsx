import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Slider from "@/components/Slider/Slider";
import "./Home.scss";
import Categories from "@/components/Categories/Categories";
import Contact from "../../components/Contact/Contact";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts
        type="featured"
        desc="Elegance meets contemporary design with our hand-selected range of apparel. Discover the fusion of impeccable tailoring, luxurious materials, and fashion-forward aesthetics. Every stitch, every seam, and every fabric speaks volumes about our dedication to deliver unmatched quality. "
      />
      <Categories />
      <FeaturedProducts
        type="trending"
        desc="Step into the world of today's fashion zeitgeist with our array of trending products. Handpicked for the modern individual, each item embodies the pulse of the current fashion scene. The blend of innovative designs, vibrant hues, and subtle elegance makes this collection a must-have for those looking to make a statement."
      />
      <Contact />
    </div>
  );
};

export default Home;
