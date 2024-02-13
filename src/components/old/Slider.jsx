import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../assets/styles/Slider.css";

// import required modules
import { Navigation } from "swiper/modules";

export default function Slider() {
	return (
		<section className="slider">
			<div className="flex justify-content-center align-items-center">
				<Swiper navigation={true} modules={[Navigation]} className="swiper">
					<SwiperSlide>
						<div className="overlay">
							<h1>Just Swiper</h1>

							<p>This is the description</p>
						</div>
						<img
							src="https://wallpapersmug.com/download/1024x768/a2f0de/coastal-town-aerial-view-mountains-bay.jpg"
							alt=""
						/>
					</SwiperSlide>
					<SwiperSlide>Slide 2</SwiperSlide>
					<SwiperSlide>Slide 3</SwiperSlide>
					<SwiperSlide>Slide 4</SwiperSlide>
					<SwiperSlide>Slide 5</SwiperSlide>
					<SwiperSlide>Slide 6</SwiperSlide>
					<SwiperSlide>Slide 7</SwiperSlide>
					<SwiperSlide>Slide 8</SwiperSlide>
					<SwiperSlide>Slide 9</SwiperSlide>
				</Swiper>
			</div>
		</section>
	);
}
