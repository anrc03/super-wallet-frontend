import React from "react";

import heroImage from "../assets/images/hero-1.png";

export default function Header() {
  return (
    <div className="container-fluid hero-header bg-cyan py-5 mb-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-3 animate__animated animate__slideInDown">
              Make Better Life With Trusted CryptoCoin
            </h1>
            <p className="animate__animated animate__slideInDown">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <a
              href="/"
              className="btn btn-primary py-3 px-4 animate__animated animate__slideInDown"
            >
              Explore More
            </a>
          </div>
          <div className="col-lg-6 animate__animated animate__fadeIn">
            <img
              className="img-fluid animate__animated animate__pulse animate__infinite"
              style={{ animationDuration: "3s" }}
              src={heroImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
