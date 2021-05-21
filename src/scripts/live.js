import "../styles/index.scss";
import "../styles/home.scss";
import "../styles/live.scss";

import Swiper from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";

new Swiper(".slider-streams", {
  loop: true,
  slidesPerView: 1,
});
