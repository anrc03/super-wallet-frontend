import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/Navbar";
import Team from "../../components/Team";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function About() {
    return (
        <>
            <Navbar />
            <div className="container-fluid header-about">
                <div className="container py-5">
                    <div className="row g-5 align-items-center d-flex justify-content-center">
                        <div className="col-md-8 text-center">
                            <h1 className="mb-3 animated slideInDown">Super wallet can help people simplify and secure currency transactions and exchanges</h1>
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



            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-2 animate__animated animate__fadeInUp" style={{ animationDelay: "0.1s" }}>
                        <h1>About Us</h1>
                    </div>
                    <div className="col-lg-10 animate__animated animate__fadeInUp" style={{ animationDelay: "0.3s" }}>
                        <div className="h-100">
                            <p>We are a multi-currency wallet institution, capable of cross-border transactions with low admin fees, giving you the best experience. We are committed to providing security, reliability and ease of use. Security is our top priority. We have a high level of security system to protect your personal and financial information. Advanced data encryption ensures that every transaction you make with us remains confidential and secure. We are committed to providing security, reliability and ease of use. We are the first choice for all your money transaction needs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Team />

            <div className="container py-5 contact">
                <div className="row animate__animated animate__fadeInUp" style={{ animationDelay: "0.1s" }}>
                    <div className="col-lg-4">
                        <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
                            <h1 className="display-6 fw-bold">Contact Us</h1>
                            <p className="fs-5 mb-0">If You Have Any Query, Please Contact Us</p>
                            <p className="mb-2">Our office:</p>
                            <h4>123 Street, New York, USA</h4>
                            <hr className="w-100" />
                            <p className="mb-2">Call us:</p>
                            <h4>+012 345 6789</h4>
                            <hr className="w-100" />
                            <p className="mb-2">Mail us:</p>
                            <h4>info@example.com</h4>
                        </AnimationOnScroll >
                    </div>
                    <div className="col-lg-8">
                        <iframe
                            className="w-100"
                            style={{ height: "450px", marginLeft: '20px' }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7117202492464!2d106.81653397593726!3d-6.301558361674502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed44c9532647%3A0x5589ddd11d4aa627!2sEnigma%20Camp!5e0!3m2!1sen!2sus!4v1702020387985!5m2!1sen!2sus"
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        ></iframe>
                    </div>
                </div>
            </div>
            <BackToTop />
            <Footer />
        </>
    );
}
