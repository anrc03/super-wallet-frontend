import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="container-fluid footer pt-3 fadeIn" data-wow-delay="0.1s">
        <div className="container py-3">
          <div className="row g-5 d-flex justify-content-center">
            <div className="col-md-4">
            <h1 className="text-green mb-3">
              <img className="img-fluid me-3" src='./../src/assets/images/home/Logo-Super-Wallet.png' alt="" style={{ maxWidth: "55px" }} />
              Super Wallet
            </h1>
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
