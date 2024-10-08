import './FeaturedProducts.scss'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import Card from '../Card/Card'

import Loading from '@/components/Loading/Loading'
import useFetch from '@/hooks/useFetch'

FeaturedProducts.propTypes = {
  type: PropTypes.string,
  desc: PropTypes.string
}

export default function FeaturedProducts ({ type, desc }) {
  const [products, setProducts] = useState([])
  const url = import.meta.env.VITE_APP_URL_API

  const { data, loading, error } = useFetch(
    `${url}/products?populate=*&[filters][type][$eq]=${type}`
  )

  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [type, data])

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>{desc}</p>
      </div>
      <div className="bottom">
        {loading ? (
          <Loading />
        ) : error ? (
          <h1>An error has occurred, please try again later.</h1>
        ) : (
          products?.map((product) => (
            <Card key={product.id} item={product.attributes} id={product.id} />
          ))
        )}
      </div>
    </div>
  )
}
