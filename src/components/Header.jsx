import React from "react";

export default function Header() {
  return (
    <div className="container-fluid hero-header bg-cyan py-5 mb-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-3 animate__animated animate__slideInDown">
              Make Better All Currencies With Trusted Super Wallet
            </h1>
            <p className="animate__animated animate__slideInDown">
              Transform your currency exchanges into a superior experience with
              our trusted Super Wallet app. Embrace the convenience of managing
              all currencies effortlessly, ensuring a seamless and secure
              money-changing journey. Choose a better financial path with our
              reliable platform, where your transactions are elevated to new
              heights.
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
