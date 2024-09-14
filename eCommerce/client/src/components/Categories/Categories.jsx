import { useEffect, useState } from 'react'
import './Categories.scss'
import { Link } from 'react-router-dom'
import { makeRequest } from '@/hooks/makeRequest'
import PropTypes from 'prop-types'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await makeRequest.get('/categories?populate=*')
        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategories()
  }, [])

  const CategoryBlock = ({ name }) => {
    const category = categories.data?.find(
      (item) => item.attributes.title === name
    )

    if (!category) return

    return (
      <div className="row">
        <img src={category.attributes.img.data.attributes.url} alt={name} />
        <Link
          to={`/products/${category.attributes.title}`}
          className="link catBTN"
        >
          {name.toUpperCase()}
        </Link>
      </div>
    )
  }

  CategoryBlock.propTypes = {
    name: PropTypes.string
  }

  return (
    <div className="categories">
      <div className="col">
        <CategoryBlock name="kids" />
        <CategoryBlock name="accessories" />
      </div>
      <div className="col">
        <CategoryBlock name="men" />
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <CategoryBlock name="makeup" />
          </div>
          <div className="col">
            <CategoryBlock name="bath" />
          </div>
        </div>
        <CategoryBlock name="women" />
      </div>
    </div>
  )
}

export default Categories
