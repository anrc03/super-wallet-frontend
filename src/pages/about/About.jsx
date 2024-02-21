import { useEffect, useState } from "react";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/Navbar";
import Team from "../../components/Team";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Helmet } from 'react-helmet';
import LoadSpinner from "../../components/LoadSpinner";

export default function About() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [])

    if (isLoading) return <LoadSpinner />

    return (
        <>
            <Helmet>
                <title>About Us | Super Wallet</title>
            </Helmet>
            <Navbar />
            <div className="container-fluid header-about animate__animated animate__slideInDown">
                <div className="container py-5">
                    <div className="row g-5 align-items-center d-flex justify-content-center">
                        <div className="col-md-8 text-center">
                            <h1 className="mb-3">Super wallet can help people simplify and secure currency transactions and exchanges</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-about animate__animated animate__fadeInUp" style={{ animationDelay: "0.3s" }}>
                <div className="container py-5">
                    <div className="row align-items-center about-info">
                        <div className="col-lg-2">
                            <h1>About Us</h1>
                        </div>
                        <div className="col-lg-10">
                            <p>We are a multi-currency wallet institution, capable of cross-border transactions with low admin fees, giving you the best experience. We are committed to providing security, reliability and ease of use. Security is our top priority. We have a high level of security system to protect your personal and financial information. Advanced data encryption ensures that every transaction you make with us remains confidential and secure. We are committed to providing security, reliability and ease of use. We are the first choice for all your money transaction needs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-vision-mission animate__animated animate__fadeInUp" style={{ animationDelay: "0.8s" }}>
                <div className="p-5">
                    <div className="row">
                        <div className="col-md-6 vision-container">
                            <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
                                <div className="vision-mission-info">
                                    <h1>Our Vision</h1>
                                    <div className="info-center">
                                        <hr />
                                    </div>
                                    <p>Become an institution that simplifies and secures transactions and currency exchanges to expand global financial access.</p>
                                </div>
                            </AnimationOnScroll>
                        </div>

                        <div className="col-md-6">
                            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
                                <div className="vision-mission-info">
                                    <h1>Our Mission </h1>
                                    <div className="info-center">
                                        <hr />
                                    </div>
                                    <ol>
                                        <li>Providing a multi-currency wallet service that enables cross-border transactions with low administrative costs to deliver the best experience to users.</li>
                                        <li>Placing security as our top priority with a high-level security system to protect users' personal and financial information.</li>
                                        <li>Committing to provide reliability and ease of use in every aspect of our services.</li>
                                        <li>Becoming the first choice for all users' financial transaction needs.</li>
                                    </ol>
                                </div>
                            </AnimationOnScroll>
                        </div>
                    </div>
                </div>
            </div>

            <Team />

            <div className="container py-5 contact">
                <div className="row animate__animated animate__fadeInUp" style={{ animationDelay: "0.1s" }}>
                    <div className="col-lg-5">
                        <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
                            <h1 className="display-6 fw-bold mb-1">Contact Us</h1>
                            <p className="fs-5 mb-2">If You Have Any Questions, Please Contact Us</p>
                            <h5 className="mb-2">Our office :</h5>
                            <h4>Jl. H. Dahlan No.75, RT.008/RW.004,<br />Ragunan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta</h4>
                            <hr className="w-100" />
                            <h5 className="mb-2">Call us :</h5>
                            <h4>+62 895 024 811 95</h4>
                            <hr className="w-100" />
                            <h5 className="mb-2">Email us :</h5>
                            <h4>call.superwallet@gmail.com</h4>
                        </AnimationOnScroll >
                    </div>
                    <div className="col-lg-7">
                        <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
                            <iframe
                                className="w-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7117202492464!2d106.81653397593726!3d-6.301558361674502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed44c9532647%3A0x5589ddd11d4aa627!2sEnigma%20Camp!5e0!3m2!1sen!2sus!4v1702020387985!5m2!1sen!2sus"
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            ></iframe>
                        </AnimationOnScroll>
                    </div>
                </div>
            </div>
            <BackToTop />
            <Footer />
        </>
    );
}
