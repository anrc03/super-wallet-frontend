import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

export default function Faq() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto wow animate__animated animate__fadeInUp"
          style={{ maxWidth: "500px" }}
        >
          <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
            <h1 className="display-6 fw-bold">FAQs</h1>
            <p className="text-cyan fs-5 mb-5">Frequently Asked Questions</p>
          </AnimationOnScroll>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How to build a website?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam
                      sed sed magna et magna diam aliquyam amet dolore ipsum
                      erat duo. Sit rebum magna duo labore no diam.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={200}>
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      How long will it take to get a new website?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam
                      sed sed magna et magna diam aliquyam amet dolore ipsum
                      erat duo. Sit rebum magna duo labore no diam.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Do you only create HTML websites?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam
                      sed sed magna et magna diam aliquyam amet dolore ipsum
                      erat duo. Sit rebum magna duo labore no diam.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={400}>
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      Will my website be mobile-friendly?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Dolor nonumy tempor elitr et rebum ipsum sit duo duo. Diam
                      sed sed magna et magna diam aliquyam amet dolore ipsum
                      erat duo. Sit rebum magna duo labore no diam.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
