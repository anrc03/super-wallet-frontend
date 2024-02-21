import React from 'react'
import { AnimationOnScroll } from "react-animation-on-scroll/dist/js";

function Team() {
  return (
    <section id="team" className="team">
      <div className="container">

        <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
          <div className="text-center">
            <h1 className='text-green display-6 fw-bold'>Team</h1>
            <p className='text-green fs-5 mb-4'>Our team is always here to help</p>
          </div>
        </AnimationOnScroll>

        <div className="row">

          <div className="col-xl-4 col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
              <div className="member">
                <img src="./src/assets/images/team/Team-Baskara.jpg" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Baskara Restu Irawan</h4>
                    <span>Software Developer</span>
                  </div>
                  <div className="social">
                    <a href=""><i className="bi bi-twitter-x"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-instagram"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
              <div className="member">
                <img src="./src/assets/images/team/Team-Mikhael.jpg" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Mikhael Wellman</h4>
                    <span>Software Developer</span>
                  </div>
                  <div className="social">
                    <a href="https://www.instagram.com/mikhaelvanwellman?igsh=MXVoOGk1eHp3cDZoNw=="><i className="bi bi-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/mikhael-wellman-399167159?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
              <div className="member">
                <img src="./src/assets/images/team/Team-Alwan.png" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Muhammad Alwansyah Mardika</h4>
                    <span>Software Developer</span>
                  </div>
                  <div className="social">
                    <a href="https://www.instagram.com/alwanmrdika"><i className="bi bi-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/muhammad-alwansyah-mardika?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={100}>
              <div className="member">
                <img src="./src/assets/images/team/Team-Anrico.png" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Anrico Gideon Alfano</h4>
                    <span>Software Developer</span>
                  </div>
                  <div className="social">
                    <a href=""><i className="bi bi-twitter-x"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-instagram"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={300}>
              <div className="member">
                <img src="./src/assets/images/team/Team-Alvin.png" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Alvin Rizal</h4>
                    <span>Software Developer</span>
                  </div>
                  <div className="social">
                    <a href=""><i className="bi bi-twitter-x"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-instagram"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <AnimationOnScroll animateIn="animate__fadeInUp" delay={500}>
              <div className="member">
                <img src="./src/assets/images/team/Team-Dimas.png" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Dimas Hadianto</h4>
                    <span>Software Developer</span>
                  </div>
                  <div className="social">
                    <a href="https://www.instagram.com/dim.shdn.t?igsh=bXM0aWhsMXgxdjFu"><i className="bi bi-instagram"></i></a>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Team