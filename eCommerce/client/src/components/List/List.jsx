import { useState, useEffect } from "react";
import "./List.scss";
import Card from "@/components/Card/Card";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading/Loading";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton/ProductCardSkeleton";

const List = ({ subCats, catId, maxPrice, sort }) => {
  const [productsData2, setProductsData2] = useState([]);
  const url = import.meta.env.VITE_APP_URL_API;

  const shouldSort = sort ? `&sort=price:${sort}` : "";

  const { data, loading, error } = useFetch(
    `${url}/products?populate=*&[filters][categories][id]=${catId}${subCats
      .map((subCat) => `&[filters][sub_categories][id][$eq]=${subCat}`)
      .join("")}&[filters][price][$lte]=${maxPrice}${shouldSort}`
  );

  useEffect(() => {
    if (data) {
      setProductsData2(data);
    }
  }, [data]);

  return (
    <>
      <div className="list">
        {productsData2.map((product) => (
          <Card item={product.attributes} id={product.id} key={product.id} />
        ))}
      </div>
      {loading && <ProductCardSkeleton numberOfItems={10} />}
    </>
  );
};

export default List;
