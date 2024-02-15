import React, { useEffect, useState } from "react";
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
import LoadSpinner from "./LoadSpinner";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/UserSlice";

function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

  if (isLoading) return <LoadSpinner />

  return (
    <div>
      <Navbar/>
      <Header />
      <About />
      <Trans />
      <WhyUs />
      <Service/>
      <Faq />
      <Team/>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Home;
