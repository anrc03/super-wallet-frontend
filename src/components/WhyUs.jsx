import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

import startIcon from "../assets/images/icon-7.png";
import safeIcon from "../assets/images/icon-6.png";
import affordableIcon from "../assets/images/icon-5.png";
import secureIcon from "../assets/images/icon-4.png";
import protectedIcon from "../assets/images/icon-3.png";
import custServiceIcon from "../assets/images/icon-8.png";

import FeatureItem from "./utils/FeatureItem";

export default function WhyUs() {
  return (
    <div className="container-xxl py-5 features">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
            <h1 className="display-6 fw-bold">Why Us!</h1>
            <p className="text-cyan fs-5 mb-5">
              The Best In The crypto Industry
            </p>
          </AnimationOnScroll>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={100}
              img={startIcon}
              title="Easy To Start"
              desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={300}
              img={safeIcon}
              title="Safe & Secure"
              desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
            />
          </div>
          <div className="col-lg-4 col-md-6 wow">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={500}
              img={affordableIcon}
              title="Affordable Plans"
              desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={100}
              img={secureIcon}
              title="Secure Storage"
              desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={300}
              img={protectedIcon}
              title="Protected by Insurance"
              desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={500}
              img={custServiceIcon}
              title="24/7 Support"
              desc="Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
