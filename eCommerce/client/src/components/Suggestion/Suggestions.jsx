import './Suggestions.scss'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton/ProductCardSkeleton'

import Card from '@/components/Card/Card'
import useFetch from '@/hooks/useFetch'

Suggestions.propTypes = {
  productID: PropTypes.string
}

export default function Suggestions({ productID }) {
  const [subCategoryId, setSubCategoryId] = useState(null)
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const url = import.meta.env.VITE_APP_URL_API

  const { data: productData } = useFetch(
    `${url}/products?populate=*&[filters][id][$eq]=${productID}`
  )

  const { data: suggestedData } = useFetch(
    subCategoryId
      ? `${url}/sub-categories?populate=products.img,products.img2&[filters][id][$eq]=${subCategoryId}`
      : null
  )

  const filteredProducts = useMemo(() => {
    return suggestedProducts
      .filter((product) => product.id !== parseInt(productID))
      .slice(0, 4) // maximum of 4 suggested products
  }, [suggestedProducts, productID])

  useEffect(() => {
    if (productData) {
      const newSubCategoryId = productData[0]?.attributes.sub_categories.data[0]?.id
      if (newSubCategoryId) {
        setSubCategoryId(newSubCategoryId)
      }
    }
  }, [productData])

  useEffect(() => {
    if (suggestedData) {
      setSuggestedProducts(suggestedData[0]?.attributes.products.data)
    }
  }, [suggestedData])

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="suggestionsWrapper">
          <h1>You may also like</h1>
          <div className="suggestions">
            {filteredProducts.map(({ id, attributes }) => (
              <Card key={id} item={attributes} id={id} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <ProductCardSkeleton numberOfItems={4} />
        </>
      )}
    </>
  )
}
