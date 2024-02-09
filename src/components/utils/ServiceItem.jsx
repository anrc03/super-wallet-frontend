import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

export default function ServiceItem({ animate, delay, img, title, desc }) {
  return (
    <AnimationOnScroll animateIn={animate} delay={delay}>
      <div className="service-item bg-white p-5">
        <img className="img-fluid mb-4" src={img} alt="" />
        <h5 className="mb-3">{title}</h5>
        <p>{desc}</p>
        <a href="/">
          Read More <i className="fa fa-arrow-right ms-2"></i>
        </a>
      </div>
    </AnimationOnScroll>
  );
}
