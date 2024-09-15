import './Products.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import List from '@/components/List/List'
import { makeRequest } from '@/hooks/makeRequest'

import { BsFilterCircle, BsXCircle } from 'react-icons/bs'
import CheckboxSkeleton from '@/components/Skeleton/CheckboxSkeleton/CheckboxSkeleton'
import LargeImageSkeleton from '../../components/Skeleton/LargeImageSkeleton/LargeImageSkeleton'

export default function Products () {
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState('')
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [id, setId] = useState('')

  const { title } = useParams()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedSubCategories([...selectedSubCategories, e.target.value])
    } else {
      setSelectedSubCategories(
        selectedSubCategories.filter((item) => item !== e.target.value)
      )
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await makeRequest.get(
          `/categories?populate=*&[filters][title][$eq]=${title}`
        )
        setCategories(response.data)
        setId(response.data.data[0].id)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategories()
  }, [title])

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (!id) return
        const response = await makeRequest.get(
          `/sub-categories?populate=*&[filters][categories][id][$eq]=${id}`
        )
        setSubCategories(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubCategories()
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id, selectedSubCategories])

  return (
    <div className="products">
      <div className="filterIcon" onClick={toggleMenu}>
        {isMenuOpen ? <BsXCircle /> : <BsFilterCircle />}
      </div>

      <div className={isMenuOpen ? 'left open' : 'left'}>
        <div className="filterItem">
          <h1>Shop by Category</h1>
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => {
              return (
                <div className="inputItem" key={subCategory.id}>
                  <input
                    type="checkbox"
                    id={subCategory.id}
                    value={subCategory.id}
                    name={subCategory.name}
                    onChange={handleChange}
                  />
                  <label htmlFor={subCategory.id}>
                    {capitalizeFirstLetter(subCategory.attributes.title)}
                  </label>
                </div>
              )
            })
          ) : (
            <CheckboxSkeleton numberOfItems={6} />
          )}
        </div>
        <div className="filterItem">
          <h1 id="priceFilterLabel">Price Range</h1>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              id="priceRangeInput"
              aria-labelledby="priceFilterLabel"
              min={0}
              max={1000}
              onMouseUp={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem sort">
          <h1>Sort By</h1>
          <div className="inputItem">
            <input
              type="radio"
              id="acs"
              value="acs"
              name="price"
              onChange={() => setSort('asc')}
            />
            <label htmlFor="acs">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={() => setSort('desc')}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        {categories?.data?.length > 0 ? (
          <img
            className="categoryIMG"
            src={categories.data[0].attributes.img.data.attributes.url}
            alt=""
          />
        ) : (
          <LargeImageSkeleton />
        )}
        {id ? (
          <List
            catId={String(id)}
            maxPrice={Number(maxPrice)}
            sort={sort}
            subCats={selectedSubCategories}
          />
        ) : null}
      </div>
    </div>
  )
}
