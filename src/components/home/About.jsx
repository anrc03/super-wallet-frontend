import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container-xxl py-5 mt-2 mb-4">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-4">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
              <img className="img-fluid image-about" src='./src/assets/images/home/About.png' alt="" />
            </AnimationOnScroll>
          </div>
          <div className="col-lg-8">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
              <div className="h-100">
                <h1 className="fw-bold text-green">About Us</h1>
                <p className="fs-5 mb-2 text-green">Trusted digital money platform</p>
                <p>We are a multi-currency wallet institution, capable of cross-border transactions with low admin fees, giving you the best experience. We are committed to providing security, reliability and ease of use.</p>
                <p className="mb-3">Security is our top priority. We have a high level of security system to protect your personal and financial information. Advanced data encryption ensures that every transaction you make with us remains confidential and secure.</p>
                <p className="mb-3">We are committed to providing security, reliability and ease of use. We are the first choice for all your money transaction needs.</p>
                <Link to="/about" className="btn btn-green py-3 px-4" href="">Read More</Link>
              </div>
            </AnimationOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
