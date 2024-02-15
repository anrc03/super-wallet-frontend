import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";
import { Helmet } from 'react-helmet';

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
      <Helmet>
            <title>Super Wallet</title>
        </Helmet>
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
