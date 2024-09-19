import Contact from '../../components/Contact/Contact'

import Categories from '@/components/Categories/Categories'
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts'
import Slider from '@/components/Slider/Slider'


export default function Home () {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts
        type="featured"
        desc="Experience elegance through our curated range of tailored, high-quality apparel."
      />
      <Categories />
      <FeaturedProducts
        type="trending"
        desc="Explore handpicked fashion essentials that capture the current style pulse, blending innovation and elegance."
      />
      <Contact />
    </div>
  )
}
