import "./FeaturedProducts.scss";
import { productsData } from "./products";
import Card from "../Card/Card";

const FeaturedProducts = ({ type }) => {
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus ipsa
          animi neque ipsam molestias ex explicabo natus molestiae. Facilis
          repudiandae eligendi error, delectus impedit nam rem tenetur
          temporibus itaque iste.
        </p>
      </div>
      <div className="bottom">
        {productsData.map((product) => (
            <Card key={product.id} item={product}/>

        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
