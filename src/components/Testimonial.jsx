import { AnimationOnScroll } from "react-animation-on-scroll";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

import TestimonialItem from "./utils/TestimonialItem";
import "../assets/styles/Testimonial.css";

import testi1 from "./../assets/images/testi/Testi-1.jpeg";
import testi2 from "./../assets/images/testi/Testi-2.jpeg";
import testi3 from "./../assets/images/testi/Testi-3.jpeg";
import testi4 from "./../assets/images/testi/Testi-4.jpeg";
import testi5 from "./../assets/images/testi/Testi-5.jpeg";
import testi6 from "./../assets/images/testi/Testi-6.jpeg";

export default function Testimonial() {
  const data = [
    {
      comment:
        "Super Wallet has truly revolutionized the way I conduct financial transactions. Its low fees and fast service make it my top choice. Highly recommended!",
      image: testi2,
      name: "Budi Setiawan",
      location: "Jawa Tengah, Indonesia",
      stars: 4.7,
    },
    {
      comment:
        "As an international businessman, the ability to exchange currency at low fees is very important to me. Super Wallet provides a great solution with its advanced features. Very satisfied with the user experience!",
      image: testi5,
      name: "Yuliana Dwi Ayu",
      location: "Bali, Indonesia",
      stars: 4.3,
    },
    {
      comment:
        "With Super Wallet, I can send and receive money from various countries at a much lower cost than other services. No more hassle of cross-border transactions. Thank you Super Wallet!",
      image: testi3,
      name: "James Fransisko",
      location: "Singapore",
      stars: 5,
    },
    {
      comment:
        "Super Wallet is a game changer! I used to worry about huge fees and slow processing times when dealing with international transactions. Now, with Super Wallet, everything is smooth and cost-effective. So happy!",
      image: testi6,
      name: "Wiliam Robert",
      location: "Tokyo, Japan",
      stars: 4.5,
    },
    {
      comment:
        "I've tried several apps for cross-border transactions, but nothing compares to the convenience and affordability of Super Wallet. It's like having a global bank account in your pocket. Impressive beyond words!",
      image: testi1,
      name: "Kim Tae Kyung",
      location: "Busan, South Korea",
      stars: 4.5,
    },
    {
      comment:
        "Thanks to Super Wallet, I am no longer afraid of making international payments. Its transparent fee structure and user-friendly interface have made my life much easier. Thank you to the Super Wallet team for creating such a great app!",
      image: testi4,
      name: "Roby Gustolft",
      location: "New York City, USA",
      stars: 5,
    },
  ];

  return (
    <div className="container-xxl py-5 testimonial">
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={700}>
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
            <h1 className="text-green display-6 fw-bold">Testimonials</h1>
            <p className="text-green fs-5 mb-4">What they said about Super Wallet?</p>
        </div>
        <Swiper
          className="testimonial-carousel"
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          modules={[Pagination, Autoplay, Navigation]}
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
      </AnimationOnScroll>
    </div>
  );
};