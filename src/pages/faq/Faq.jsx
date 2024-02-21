import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import Questions from '../../components/Questions';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';
import LoadSpinner from "../../components/LoadSpinner";
import { AnimationOnScroll } from 'react-animation-on-scroll';

export default function Faq() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [])

    if (isLoading) return <LoadSpinner />
    return (
        <div>
            <Helmet>
                <title>FAQ | Super Wallet</title>
            </Helmet>
            <Navbar />
            <div className="container-fluid header-faq animate__animated animate__slideInDown">
                <div className="container py-5">
                    <div className="row g-5 align-items-center d-flex justify-content-center">
                        <div className="col-md-8 text-center">
                            <h1 className="mb-2 animation slideInDown">Discover Smooth and Secure Currency Transactions with Super Wallet</h1>
                            <p className="animation slideInDown">Your preferred platform for hassle-free transactions and currency exchange</p>
                        </div>
                        {/* <div className="col-lg-6 animate__animated animate_fadeIn">
                            <img
                                className="img-fluid animate__animated animate__pulse animate__infinite"
                                style={{ animationDuration: "3s" }}
                                src=""
                                alt=""
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            <Questions />
            <div className="pb-5">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
                    <div className="bg-faq animate__animated animate__fadeInUp mb-4" style={{ animationDelay: "0.8s" }}>
                        <div className="row" style={{ width: '100%' }}>
                            <div className="col-md-5 faq-container">
                                <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
                                    <h1>Haven't found the answer yet?</h1>
                                    <p>Contact our team so we can help answer the questions you have</p>
                                </AnimationOnScroll>
                            </div>
                            <div className="col-md-7">
                                <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
                                    <div className="faq-info text-center">
                                        <h1><i class="bi bi-whatsapp"></i> +62 878 910 111 2 </h1>
                                        <p>Don't forget to mention your name, the problem you found, and the email address used.</p>
                                    </div>
                                </AnimationOnScroll>
                            </div>
                        </div>
                    </div>
                </AnimationOnScroll>
            </div>
            <Footer />
        </div>
    )
}
