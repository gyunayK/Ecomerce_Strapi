import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './Slider.scss'

export default function Slider () {
  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent(current === 0 ? 3 : current - 1)
  }

  const nextSlide = () => {
    setCurrent(current === 3 ? 0 : current + 1)
  }

  useEffect(() => {
    const handleAutoChangeSlide = () => {
      setCurrent(current === 3 ? 0 : current + 1)
    }
    const interval = setInterval(handleAutoChangeSlide, 9000) // 9s
    return () => clearInterval(interval)
  }, [current])

  const data = [
    '/img/slider/robert.webp',
    '/img/slider/ant.webp',
    '/img/slider/florida.webp',
    '/img/slider/amos.webp',
  ]

  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {data.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <ArrowBackIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  )
}
