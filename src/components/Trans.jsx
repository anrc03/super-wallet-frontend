import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Trans() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const todayTransaction = 120;
  const monthlyTransaction = 500;
  const totalTransaction = todayTransaction + monthlyTransaction;

  return (
    <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
      <div className="bg-transaction">
        <div className="container-xxl" ref={ref}>
          <div className="container py-5">
            <div className="row g-5 justify-content-center">
              <div className="text-center mx-auto">
                <AnimationOnScroll animateIn="animate__fadeInUp" delay={200}>
                  <h1 className="display-6 fw-bold">PROVIDING EASY ACCESS TO EXCHANGE CURRENCIES AND TRANSACTIONS IN YOUR WALLET</h1>
                  <p className="fs-5">We have served more than {inView && <CountUp end={totalTransaction} duration={4} />} + transactions across all users</p>
                </AnimationOnScroll>
              </div>
              <div className="col-lg-2 col-md-6 text-center trans-detail">
                <AnimationOnScroll animateIn="animate__fadeIn" delay={400}>
                  <h1 className="display-5 fw-bold">{inView && <CountUp end={todayTransaction} duration={4} />} +</h1>
                  <p className="fs-5 mb-0">Today Transactions</p>
                </AnimationOnScroll>
              </div>
              <div className="col-lg-2 col-md-6 text-center trans-detail" style={{ animationDelay: "0.3s" }}>
                <AnimationOnScroll animateIn="animate__fadeIn" delay={800}>
                  <h1 className="display-5 fw-bold counter">{inView && <CountUp end={monthlyTransaction} duration={4} />} +</h1>
                  <p className="fs-5 mb-0">Monthly Transactions</p>
                </AnimationOnScroll>
              </div>
              <div className="col-lg-2 col-md-6 text-center trans-detail" style={{ animationDelay: "0.5s" }}>
                <AnimationOnScroll animateIn="animate__fadeIn" delay={1000}>
                  <h1 className="display-5 fw-bold counter">{inView && <CountUp end={totalTransaction} duration={4} />} +</h1>
                  <p className="fs-5 mb-0">Total Transactions</p>
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationOnScroll>
  );
}
