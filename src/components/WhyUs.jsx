import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

import FeatureItem from "./utils/FeatureItem";

export default function WhyUs() {
  return (
    <div className="container-xxl py-5">
      <div className="container py-4">
        <div className="text-center mx-auto">
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
            <h1 className="text-green display-6 fw-bold">Why Super Wallet?</h1>
            <p className="text-green fs-5 mb-5">Super Wallet has become an experienced and trusted digital wallet institution</p>
          </AnimationOnScroll>
        </div>
        <div className="row g-5 why-us">
          <div className="col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
              <img className='animate__fadeInUp' src='./../src/assets/images/why/Why-1.png' alt="" />
            </AnimationOnScroll>
            <FeatureItem
              animate="animate__fadeInUp"
              delay={100}
              title="Simple User Interface"
              desc="Super Wallet offers a user-friendly interface that makes managing your cross-border transactions easy. With an intuitive design and easy navigation, exchanging sending and receiving money will be as easy as ever."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
              <img className='animate__fadeInUp' src='./../src/assets/images/why/Why-2.png' alt="" />
            </AnimationOnScroll>
            <FeatureItem
              animate="animate__fadeInUp"
              delay={300}
              title="Instant Transfer"
              desc="Say goodbye to long waiting times. With Super Wallet, cross-border transactions are instant, allowing you to access your balance whenever you need it without delay."
            />
          </div>
          <div className="col-lg-4 col-md-6 wow">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
              <img className='animate__fadeInUp' src='./../src/assets/images/why/Why-3.png' alt="" />
            </AnimationOnScroll>
            <FeatureItem
              animate="animate__fadeInUp"
              delay={500}
              title="24/7 Accessibility"
              desc="Need to make transactions during certain hours? Does not matter! Super Wallet is available 24/7, ensuring you can make transactions anytime, anywhere, at your convenience."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
              <img className='animate__fadeInUp' src='./../src/assets/images/why/Why-4.png' alt="" />
            </AnimationOnScroll>
            <FeatureItem
              animate="animate__fadeInUp"
              delay={100}
              title="Low Transaction Fees"
              desc="Super Wallet trusts that your money will stay where it is. With our low fees, you can enjoy the benefits of cross-border transactions without spending a lot of money."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
              <img className='animate__fadeInUp' src='./../src/assets/images/why/Why-5.png' alt="" />
            </AnimationOnScroll>
            <FeatureItem
              animate="animate__fadeInUp"
              delay={300}
              title="Easy Currency Conversion"
              desc="Whether you're dealing with euros, dollars, yen or others, Super Wallet handles currency conversions smoothly. You don't need to worry about exchange rates or complicated calculations – we'll take care of it all for you."
            />
          </div>
          <div className="col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
              <img className='animate__fadeInUp' src='./../src/assets/images/why/Why-6.png' alt="" />
            </AnimationOnScroll>
            <FeatureItem
              animate="animate__fadeInUp"
              delay={500}
              title="Secure and Reliable"
              desc="Your security is our priority. Super Wallet was created to protect your transactions and personal information and ensure your balance is always protected."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
