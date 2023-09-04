import { useState, useEffect } from "react";
import "./Suggestions.scss";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card/Card";

function Suggestions({ productID }) {
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const url = import.meta.env.VITE_APP_URL_API;

  // Fetch the initial product
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch(`${url}/products?populate=*&[filters][id][$eq]=${productID}`);

  // Fetch the suggested products based on subCategoryId
  const {
    data: suggestedData,
    loading: suggestedLoading,
    error: suggestedError,
  } = useFetch(
    subCategoryId
      ? `${url}/sub-categories?populate=products.img,products.img2&[filters][id][$eq]=${subCategoryId}`

      : null
  );

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
      {/* Render your suggested products here */}
      <div className="suggestions">
        {suggestedProducts.map((product) => (
          <Card key={product.id} item={product.attributes} id={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
