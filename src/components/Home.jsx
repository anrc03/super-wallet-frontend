import React from "react";

import LoadSpinner from "./LoadSpinner";
import Header from "./Header";
import About from "./About";
import Services from "./Services";
import Faq from "./Faq";
import BackToTop from "./BackToTop";
import WhyUs from "./WhyUs";
import Trans from "./Trans";

function Home() {
  return (
    <div>
      <LoadSpinner />
      <Header />
      <About />
      <Trans />
      <WhyUs />
      <Services />
      <Faq />
      <BackToTop />
    </div>
  );
}

export default Home;
