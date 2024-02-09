import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import todayIcon from "../assets/images/icon-9.png";
import monthlyIcon from "../assets/images/icon-10.png";
import totalTransactionIcon from "../assets/images/icon-2.png";

export default function Trans() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const todayTransaction = 120;
  const monthlyTransaction = 457;

  const totalTransaction = todayTransaction + monthlyTransaction;

  return (
    <div className="container-xxl bg-cyan py-5 my-5" ref={ref}>
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 text-center">
            <AnimationOnScroll animateIn="animate__fadeIn">
              <img className="img-fluid mb-4" src={todayIcon} alt="" />
              <h1 className="display-4 fw-bold">
                {inView && <CountUp end={todayTransaction} duration={4} />}
              </h1>
              <p className="fs-5 text-cyan mb-0">Today Transactions</p>
            </AnimationOnScroll>
          </div>
          <div
            className="col-lg-4 col-md-6 text-center"
            style={{ animationDelay: "0.3s" }}
          >
            <AnimationOnScroll animateIn="animate__fadeIn">
              <img className="img-fluid mb-4" src={monthlyIcon} alt="" />
              <h1 className="display-4 fw-bold counter">
                {inView && <CountUp end={monthlyTransaction} duration={4} />}
              </h1>
              <p className="fs-5 text-cyan mb-0">Monthly Transactions</p>
            </AnimationOnScroll>
          </div>
          <div
            className="col-lg-4 col-md-6 text-center"
            style={{ animationDelay: "0.5s" }}
          >
            <AnimationOnScroll animateIn="animate__fadeIn">
              <img
                className="img-fluid mb-4"
                src={totalTransactionIcon}
                alt=""
              />
              <h1 className="display-4 fw-bold counter">
                {inView && <CountUp end={totalTransaction} duration={4} />}
              </h1>
              <p className="fs-5 text-cyan mb-0">Total Transactions</p>
            </AnimationOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
