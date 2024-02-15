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
    <div className="container-xxl py-4 features">
      <div className="container">
        <div className="text-center mx-auto">
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
            <h1 className="text-green display-6 fw-bold">Why Super Wallet?</h1>
            <p className="fs-5 mb-5">Super Wallet has become an experienced and trusted digital wallet institution</p>
          </AnimationOnScroll>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={100}
              img={startIcon}
              title="Easy To Start"
              desc="Our user-friendly interface and simple setup process make it easy for you to embark on a seamless journey of managing your currencies."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={300}
              img={safeIcon}
              title="Safe & Secure"
              desc="Trust in our commitment to providing a safe environment for your financial activities, offering you peace of mind as you confidently navigate the world of currency exchange."
            />
          </div>
          <div className="col-lg-4 col-md-6 wow">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={500}
              img={affordableIcon}
              title="Affordable Plans"
              desc="Enjoy the convenience of affordable and transparent currency exchange options."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={100}
              img={secureIcon}
              title="Secure Storage"
              desc="We prioritize the confidentiality of your data, ensuring a trustworthy and protected environment for all your currency exchange needs."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={300}
              img={protectedIcon}
              title="Protected by Insurance"
              desc="With our commitment to security and reliability, your currency exchanges are convenient and protected by insurance for an extra level of confidence."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <FeatureItem
              animate="animate__fadeInUp"
              delay={500}
              img={custServiceIcon}
              title="24/7 Support"
              desc="Trust in our commitment to constant assistance, making your financial transactions convenient and worry-free."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
