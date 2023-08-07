import { useState, useEffect } from "react";
import "./List.scss";
import Card from "@/components/Card/Card";
import useFetch from "@/hooks/useFetch";

const List = () => {
  const [productsData2, setProductsData2] = useState([]);
  const url = import.meta.env.VITE_APP_URL_API;

  const { data, loading, error } = useFetch(`${url}/products?populate=*`);

  useEffect(() => {
    if (data) {
      setProductsData2(data);
    }
  }, [data]);

  return (
    <div className="list">
      {/* {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>An error has occurred, please try again later.</h1>
      ) : (
        productsData2?.map((product) => {
          return <Card item={product} key={product.id} />;
        })
      )} */}
    </div>
  );
};

export default List;
