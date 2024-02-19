const TestimonialItem = ({ item }) => {
  const generateStars = () => {
    const fullStars = Math.min(Math.floor(item.stars), 5);
    const hasHalfStar = item.stars % 1 !== 0;

    const starArray = Array.from({ length: fullStars }, (_, index) => (
      <i key={index} className="bi bi-star-fill text-cyan"></i>
    ));

    if (hasHalfStar) {
      starArray.push(<i key="half" className="bi bi-star-half text-cyan"></i>);
    }

    const emptyStar = Math.max(5 - starArray.length, 0);

    starArray.push(
      ...Array.from({ length: emptyStar }, (_, index) => (
        <i key={`empty-${index}`} className="bi bi-star text-cyan"></i>
      ))
    );

    return starArray;
  };

  return (
    <div className="testimonial-item text-center rounded pb-4">
      <div className="testimonial-comment bg-light rounded p-4">
        <p className="text-center mb-5">{item.comment}</p>
      </div>
      <div className="testimonial-img p-1">
        <img
          src={item.image}
          className="img-fluid rounded-circle"
          alt="Image"
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <h5 className="mb-0">{item.name}</h5>
        <p className="mb-0">{item.location}</p>
        <div className="d-flex justify-content-center">{generateStars()}</div>
      </div>
    </div>
  );
};

export default TestimonialItem;
