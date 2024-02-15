import React from "react";
import LoadSpinner from "../../components/LoadSpinner"
import About from "../../components/home/About";
import Trans from "../../components/Trans"
import WhyUs from "../../components/WhyUs"
import Service from "../../components/Service"
import Faq from "../../components/Faq"
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/home/Header";

function Home() {
  return (
    <div>
      <LoadSpinner />
      <Navbar />
      <Header />
      <About />
      <Trans />
      <WhyUs />
      <Service />
      <Faq />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Home;
