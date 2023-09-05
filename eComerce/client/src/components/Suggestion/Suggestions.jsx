import { useState, useEffect, useMemo } from "react";
import "./Suggestions.scss";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card/Card";


function Suggestions({ productID }) {
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const url = import.meta.env.VITE_APP_URL_API;

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch(`${url}/products?populate=*&[filters][id][$eq]=${productID}`);

  const {
    data: suggestedData,
    loading: suggestedLoading,
    error: suggestedError,
  } = useFetch(
    subCategoryId
      ? `${url}/sub-categories?populate=products.img,products.img2&[filters][id][$eq]=${subCategoryId}`
      : null
  );

  const filteredProducts = useMemo(() => {
    return suggestedProducts
      .filter((product) => product.id !== parseInt(productID))
      .slice(0, 4); // This will limit the array to a maximum of 4 elements
  }, [suggestedProducts, productID]);

  useEffect(() => {
    if (productData) {
      const newSubCategoryId =
        productData[0]?.attributes.sub_categories.data[0]?.id;
      if (newSubCategoryId) {
        setSubCategoryId(newSubCategoryId);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (suggestedData) {
      setSuggestedProducts(suggestedData[0]?.attributes.products.data);
    }
  }, [suggestedData]);

  return (
    <div className="suggestionsWrapper">
      <h1>You may also like</h1>

      <div className="suggestions">
        {filteredProducts.map(({ id, attributes }) => (
          <Card key={id} item={attributes} id={id} />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
