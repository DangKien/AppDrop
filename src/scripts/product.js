/** @format */

import "../styles/home.scss";
import "../styles/product.scss";

import Swiper from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    new Swiper(".slider-product", {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }
};
