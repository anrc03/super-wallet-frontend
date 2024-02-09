import React from 'react'

function About() {
    return (
        <section className="about">
            <div className="container">
                <div className="section-header">
                    <h2>About Us</h2>
                    <p>Learn More <span>About Us</span></p>
                </div>

                <div className="row gy-4">
                    <div className="col-lg-7 position-relative about-img">
                    </div>
                    <div className="col-lg-5 d-flex">
                        <div className="content ps-0 ps-lg-5">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <ul>
                                <li><i className="bi bi-check2-all"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                <li><i className="bi bi-check2-all"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                                <li><i className="bi bi-check2-all"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                            </ul>
                            <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</p>
                            
                            <div className="position-relative mt-2">
                                <img src="src/assets/images/about/About-2.jpg" className="img-fluid" alt="About Picture" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default About