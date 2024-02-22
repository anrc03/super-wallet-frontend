import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

export default function FeatureItem({ animate, delay, img, title, desc }) {
	return (
		<AnimationOnScroll animateIn={animate} delay={delay}>
			<div className="d-flex align-items-start">
				<img className="img-fluid flex-shrink-0" src={img} alt="" />
				<div className="ps-4">
					<h5 className="mb-3">{title}</h5>
					<span>{desc}</span>
				</div>
			</div>
		</AnimationOnScroll>
	);
}
