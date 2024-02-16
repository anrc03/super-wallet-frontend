import { Link } from "react-router-dom";
import logo from "../assets/images/icon-1.png";

export default function Footer() {
  return (
    <div>
      <div className="container-fluid footer pt-3 fadeIn" data-wow-delay="0.1s">
        <div className="container py-3">
          <div className="row g-5 d-flex justify-content-center">
            {/* <div className="col-md-4">
            <h1 className="text-green mb-4">
              <img className="img-fluid me-2" src={logo} alt="" style={{ maxWidth: "45px" }} />
              Super Wallet
            </h1>
            <span>
              Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat
              ipsum et lorem et sit, sed stet lorem sit clita. Diam dolor diam
              ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem
              et sit.
            </span>
          </div> */}
            <div className="col-lg-4 col-md-6">
              <h5 className="mb-3 title-footer">Contact us</h5>
              <p><i className="fa fa-map-marker-alt me-3"></i>Jl. H. Dahlan No.75, RT.008/RW.004,<br />Ragunan, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta</p>
              <p><i className="fa fa-phone-alt me-3"></i>+62 895 024 811 95</p>
              <p><i className="fa fa-envelope me-3"></i>callsw@superwallet.com</p>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="mb-3 title-footer">Quick Links</h5>
              <Link className="btn btn-link" to="/">Home</Link>
              <Link className="btn btn-link" to="/about">About Us</Link>
              <Link className="btn btn-link" to="/service">Service</Link>
              <Link className="btn btn-link" to="/faq">FAQ</Link>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="mb-3 title-footer">Follow Us</h5>
              <div className="d-flex">
                <a className="btn btn-square rounded-circle me-2" href="">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a className="btn btn-square rounded-circle me-2" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-square rounded-circle me-2" href="">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-square rounded-circle me-2" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="copyright">
          &copy; 2024 <Link to='/'><strong><span>Super Wallet</span></strong></Link> | All Rights Reserved
        </div>
      </div>
    </div>
  );
}
