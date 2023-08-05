import { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Slider.scss";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? 2 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === 2 ? 0 : current + 1);
  };

  const data = [
    "https://ik.imagekit.io/riviaa/ImgEC/769525.jpg?updatedAt=1691194753862",
    "https://ik.imagekit.io/riviaa/ImgEC/back-view-portrait-of-walking-stylish-african-american-man-wear-on-sunglasses-and-cap-with-handbag-outdoor-street-fashion-black-man-photo.jpg?updatedAt=1691194629793",
    "https://ik.imagekit.io/riviaa/ImgEC/istockphoto-627047390-612x612.jpg?updatedAt=1691194628331",
  ];

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
  );
};

export default Slider;
