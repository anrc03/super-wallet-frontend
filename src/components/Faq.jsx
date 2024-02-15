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
            <p className="text-green fs-5 mb-5">Frequently Asked Questions</p>
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
                      What is the Money Changer App, and how does it work?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      The Money Changer App is a user-friendly platform designed
                      for seamless currency exchange. It allows you to buy,
                      sell, and manage various currencies effortlessly. Download
                      the app, sign up, and start exchanging currencies with
                      ease.
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
                      Is the Money Changer App secure?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes, security is our top priority. The app employs
                      advanced encryption and secure storage protocols to ensure
                      the confidentiality and safety of your financial
                      information. Your transactions and data are protected
                      24/7.
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
                      How do I get started with the Money Changer App?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Getting started is easy! Download the app, create an
                      account, and follow the simple setup process. Once
                      registered, you can explore the features and initiate
                      currency exchanges at your convenience.
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
                      Are there any fees for using the Money Changer App?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Our app offers cheap and efficient currency exchange fees
                      for your needs.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="true"
                      aria-controls="collapseFive"
                    >
                      What currencies are supported by the Money Changer App?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      The app supports various currencies, allowing you to
                      exchange and manage multiple denominations. You can find
                      the complete list of supported currencies within the app.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={600}>
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="true"
                      aria-controls="collapseSix"
                    >
                      Are there any fees for using the Money Changer App?
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Our app offers cheap and efficient currency exchange fees
                      for your needs.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={700}>
                  <h2 className="accordion-header" id="headingSeven">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeven"
                      aria-expanded="true"
                      aria-controls="collapseSeven"
                    >
                      Can I track my transaction history on the Money Changer
                      App?
                    </button>
                  </h2>
                  <div
                    id="collapseSeven"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSeven"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Absolutely. The app provides a comprehensive transaction
                      history feature, allowing you to track and review all your
                      past exchanges. This feature enhances transparency and
                      helps you keep detailed records.
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className="accordion-item">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={800}>
                  <h2 className="accordion-header" id="headingEight">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight"
                      aria-expanded="true"
                      aria-controls="collapseEight"
                    >
                      Is there insurance coverage for my transactions on the
                      Money Changer App?
                    </button>
                  </h2>
                  <div
                    id="collapseEight"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingEight"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes, your transactions are protected by insurance. We
                      prioritize the safety of your assets, and our insurance
                      coverage provides an additional layer of protection for
                      added peace of mind.
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
