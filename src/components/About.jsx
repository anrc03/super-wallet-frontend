import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";
import aboutImage from "../assets/images/about.png";

export default function About() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 ">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
              <img className="img-fluid" src={aboutImage} alt="" />
            </AnimationOnScroll>
          </div>
          <div className="col-lg-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
              <div className="h-100">
                <h1 className="fw-bold">About Us</h1>
                <p className="text-cyan fs-5 mb-4">
                  The Most Trusted Money Changer Platform
                </p>
                <p>
                  We are innovators in cryptocurrency exchange, dedicated to
                  providing the best experience to our users. With our
                  commitment to security, reliability, and ease of use, Super
                  Wallet is the top choice for all your currency exchange needs.
                </p>
                <p className="mb-4">
                  Our mission is to provide affordable and efficient solutions
                  to meet your currency needs. With the latest technology and an
                  experienced team of experts, we guarantee that every
                  transaction in Super Wallet is fast, secure, and trouble-free.
                </p>
                <p className="mb-4">
                  Security is our top priority. Super Wallet has a high-level
                  security system to protect your personal and financial
                  information. Advanced data encryption guarantees that every
                  transaction you make with us remains confidential and secure.
                </p>
                <div className="d-flex align-items-center mb-2">
                  <i className="fa fa-check bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
                  <span>Tempor erat elitr rebum at clita</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fa fa-check bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
                  <span>Tempor erat elitr rebum at clita</span>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="fa fa-check bg-light text-cyan btn-sm-square rounded-circle me-3 fw-bold"></i>
                  <span>Tempor erat elitr rebum at clita</span>
                </div>
                <a className="btn btn-primary py-3 px-4" href="">
                  Read More
                </a>
              </div>
            </AnimationOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
