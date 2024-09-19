import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export const useFavorites = () => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToFavorites = useCallback((item, id) => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      const exist = favorites.find((fav) => fav.id === id)

      if (exist) {
        toast.error('This product is already in your favorites')
      } else {
        const newFavorites = [...favorites, { ...item, id }]
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsFavorite(true)
        toast.success('Added to favorites')
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleRemoveFromFavorites = useCallback((id) => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      const newFavorites = favorites.filter((fav) => fav.id !== id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorite(false)
      toast.success('Removed from favorites')
    } catch (error) {
      console.log(error)
    }
  }, [])

  const checkIfFavorite = useCallback((id) => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      const exist = favorites.find((fav) => fav.id === id)
      setIsFavorite(!!exist)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return { isFavorite, handleAddToFavorites, handleRemoveFromFavorites, checkIfFavorite }
}
