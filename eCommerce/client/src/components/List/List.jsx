import { useState, useEffect } from 'react'
import './List.scss'
import Card from '@/components/Card/Card'
import useFetch from '@/hooks/useFetch'
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton/ProductCardSkeleton'
import PropTypes from 'prop-types'

const List = ({ subCats, catId, maxPrice, sort }) => {
  const [productsData2, setProductsData2] = useState([])
  const url = import.meta.env.VITE_APP_URL_API

  const shouldSort = sort ? `&sort=price:${sort}` : ''

  const { data, loading } = useFetch(
    `${url}/products?populate=*&[filters][categories][id]=${catId}${subCats
      .map((subCat) => `&[filters][sub_categories][id][$eq]=${subCat}`)
      .join('')}&[filters][price][$lte]=${maxPrice}${shouldSort}`
  )

  useEffect(() => {
    if (data) {
      setProductsData2(data)
    }
  }, [data])

  return (
    <>
      <div className="list">
        {productsData2.map((product) => (
          <Card item={product.attributes} id={product.id} key={product.id} />
        ))}
      </div>
      {loading && <ProductCardSkeleton numberOfItems={10} />}
    </>
  )
}

List.propTypes = {
  subCats: PropTypes.array,
  catId: PropTypes.string,
  maxPrice: PropTypes.number,
  sort: PropTypes.string,
}

export default List
