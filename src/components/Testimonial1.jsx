import { AnimationOnScroll } from "react-animation-on-scroll";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import TestimonialItem from "./utils/TestimonialItem";

import testi1 from "../assets/images/team/Team-Alvin.png";
import testi2 from "../assets/images/team/Team-Alwan.png";
import testi3 from "../assets/images/team/Team-Anrico.png";
import testi4 from "../assets/images/team/Team-Baskara.jpg";

const Testimonial = () => {
  const data = [
    {
      comment:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nostrum cupiditate, eligendi repellendus saepe illum earum architecto dicta quisquam quasi porro officiis. Vero reiciendis",
      image: testi1,
      name: "John Abraham",
      location: "New York, USA",
      stars: 5,
    },
    {
      comment:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nostrum cupiditate, eligendi repellendus saepe illum earum architecto dicta quisquam quasi porro officiis. Vero reiciendis",
      image: testi2,
      name: "John Abraham",
      location: "New York, USA",
      stars: 3.5,
    },
    {
      comment:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nostrum cupiditate, eligendi repellendus saepe illum earum architecto dicta quisquam quasi porro officiis. Vero reiciendis",
      image: testi3,
      name: "John Abraham",
      location: "New York, USA",
      stars: 4,
    },
    {
      comment:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis nostrum cupiditate, eligendi repellendus saepe illum earum architecto dicta quisquam quasi porro officiis. Vero reiciendis",
      image: testi4,
      name: "John Abraham",
      location: "New York, USA",
      stars: 2,
    },
  ];

  return (
    <div className="container-xxl py-5 testimonial">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
            <h1 className="display-6 fw-bold">Testimonials</h1>
            <p className="text-cyan fs-5 mb-5">What they said about us?</p>
          </AnimationOnScroll>
        </div>
        <Swiper
          className="testimonial-carousel"
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {data?.length > 0
            ? data.map((item, index) => {
                return (
                  <SwiperSlide className="swiper-slide">
                    <TestimonialItem item={item} key={index} />
                  </SwiperSlide>
                );
              })
            : ""}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
