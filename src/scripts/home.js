/** @format */

import "../styles/index.scss";
import "../styles/home.scss";

import Swiper from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 5,
      spaceBetween: 16,
    });
  }
};
