import React from "react";
import "./List.scss";
import Card from "@/components/Card/Card";

import { productsData2 } from "@/components/FeaturedProducts/products";

const List = () => {
  return (
    <div className="list">
      {productsData2.map((product) => {
        return <Card item={product} key={product.id} />;
      })}
    </div>
  );
};

export default List;
