import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/styles/Slider.css";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";

function Slider() {
  return (
    <>
      <section className="slider">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay, Pagination]}
          loop={true}
          //   autoplay={{
          //     delay: 2500,
          //     disableOnInteraction: false,
          //   }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="overlay">
              <h1>IDR ijsoakodsapks;aKLSJKAHSKAHK</h1>
              <p>Indonesia Rupiah</p>
            </div>
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-4acdb8f28c5a1345479debf056c051a2-lq"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
export default Slider;
