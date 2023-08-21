import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Slider.scss";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  
  const prevSlide = () => {
    setCurrent(current === 0 ? 3 : current - 1);
  };
  
  const nextSlide = () => {
    setCurrent(current === 3 ? 0 : current + 1);
  };
  {/* <img src="/img/payment.png" alt="payment" /> */}

  const data = [
    "/img/slider/florida.webp",
    "/img/slider/ant.webp",
    "/img/slider/robert.webp",
    "/img/slider/amos.webp",
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
