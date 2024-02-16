import React, { useRef, useState } from "react";
import avatarTesti1 from "../assets/images/team/Team-Alvin.png";
import avatarTesti2 from "../assets/images/team/Team-Alwan.png";
import avatarTesti3 from "../assets/images/team/Team-Anrico.png";
import avatarTesti4 from "../assets/images/team/Team-Baskara.jpg";
import avatarTesti5 from "../assets/images/team/Team-Dimas.png";
import avatarTesti6 from "../assets/images/team/Team-Mikhael.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../assets/styles/Testimonial.css";

// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

export default function App() {
  return (
    <>
      <section>
        <div className="main">
          <div className="head-p">
            <span style={{ paddingRight: "5px" }}>GET AN</span>
            <span style={{ paddingRight: "5px" }}>Opinion</span>
          </div>
          <div className="head">Testimonials</div>
          <Swiper
            loop={true}
            loopFillGroupWithBlank={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            className="mySwiper"
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 10,
              stretch: 50,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              758: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 150,
              },
            }}
          >
            <SwiperSlide className="swiper-slide">
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <div className="testimonials-profile-circle">
                  <img
                    src={avatarTesti1}
                    alt="avatar-testi"
                    className="avatar-testi"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo fugiat esse magnam repellat sit labore nisi nostrum
                  voluptate praesentium eveniet sequi dolore consequatur modi
                  maiores neque, eos possimus tempora velit.
                </p>
                <h6 className="review-by">Alvin</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <div className="testimonials-profile-circle">
                  <img
                    src={avatarTesti2}
                    alt="avatar-testi"
                    className="avatar-testi"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo fugiat esse magnam repellat sit labore nisi nostrum
                  voluptate praesentium eveniet sequi dolore consequatur modi
                  maiores neque, eos possimus tempora velit.
                </p>
                <h6 className="review-by">Alwan</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <div className="testimonials-profile-circle">
                  <img
                    src={avatarTesti3}
                    alt="avatar-testi"
                    className="avatar-testi"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo fugiat esse magnam repellat sit labore nisi nostrum
                  voluptate praesentium eveniet sequi dolore consequatur modi
                  maiores neque, eos possimus tempora velit.
                </p>
                <h6 className="review-by">Anrico</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <div className="testimonials-profile-circle">
                  <img
                    src={avatarTesti4}
                    alt="avatar-testi"
                    className="avatar-testi"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo fugiat esse magnam repellat sit labore nisi nostrum
                  voluptate praesentium eveniet sequi dolore consequatur modi
                  maiores neque, eos possimus tempora velit.
                </p>
                <h6 className="review-by">Baskara</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <div className="testimonials-profile-circle">
                  <img
                    src={avatarTesti5}
                    alt="avatar-testi"
                    className="avatar-testi"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo fugiat esse magnam repellat sit labore nisi nostrum
                  voluptate praesentium eveniet sequi dolore consequatur modi
                  maiores neque, eos possimus tempora velit.
                </p>
                <h6 className="review-by">Dimas</h6>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                <div className="testimonials-profile-circle">
                  <img
                    src={avatarTesti6}
                    alt="avatar-testi"
                    className="avatar-testi"
                  />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo fugiat esse magnam repellat sit labore nisi nostrum
                  voluptate praesentium eveniet sequi dolore consequatur modi
                  maiores neque, eos possimus tempora velit.
                </p>
                <h6 className="review-by">Mikhael</h6>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
