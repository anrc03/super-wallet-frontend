import React, { useEffect, useState } from "react";
import LoadSpinner from "../../components/LoadSpinner";
import About from "../../components/home/About";
import Trans from "../../components/Trans"
import WhyUs from "../../components/WhyUs"
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/home/Header";
import Testimonial from "../../components/Testimonial";
import { useSelector } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";
import { Helmet } from 'react-helmet';
import ExchangeCurrency from "../../components/ExchangeCurrency";
import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";
import Testimonial from "../../components/Testimonial";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (user) setRole(user.role)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <LoadSpinner />;

  return (
    <div>
      <Helmet>
        <title>Super Wallet</title>
      </Helmet>
      {(user === null || role === "ROLE_CUSTOMER") && 
        <div>
          <Navbar />
          <Header />
          <About />
          <Trans />
          <WhyUs />
          <div className="bg-currency">
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
            <ExchangeCurrency />
            </AnimationOnScroll>
          </div>
          <Testimonial />
          <Footer />
        </div>}
      <BackToTop />
    </div>
  );
}

export default Home;
