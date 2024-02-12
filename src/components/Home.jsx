import React from "react";
import LoadSpinner from "./LoadSpinner"
import Navbar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Trans from "./Trans"
import WhyUs from "./WhyUs"
import Service from "./Service"
import Faq from "./Faq"
import Footer from "./Footer";
import BackToTop from "./BackToTop"
import Team from "./Team";

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
      <Team/>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Home;
