import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_CUSTOMER } from "../../constant/Endpoint";
import { jwtDecode } from "jwt-decode";

import { selectUser } from "../../components/redux/UserSlice";
import { useSelector } from "react-redux";
import LoadSpinner from "../../components/LoadSpinner";
import { Helmet } from "react-helmet";
import Navbar from "../../components/navbar/Navbar";

function Profile() {
  const user = useSelector(selectUser);
  console.log(user.customerId);

  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    userCredential: {
      email: "",
    },
  });

  const customerId = user.customerId;
  console.log(customerId);

  useEffect(() => {
    console.log("ini id customer : " + customerId);

    // if (userArrayString) {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_CUSTOMER}/${customerId}`);
          setProfile(response.data.data);
        } catch (error) {
          console.error("Error fetching store data", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Error parsing user array", error.message);
      // Handle parsing errors
    }
  }, []);

  const ToEditProfile = () => {
    navigate(`/profile/edit/${customerId}`);
  };

  const ToEditPassword = () => {
    navigate(`/profile/edit-password/${customerId}`);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) return <LoadSpinner />;

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Profile | Super Wallet</title>
      </Helmet>
      <section
        style={{
          backgroundColor: "#b6d7a8",
          display: "flex",
          width: "100%",
          height: "91.2vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={profile.images || "src/assets/images/Profile.png"}
                    alt="avatar"
                    className="rounded-circle img-fluid mt-1"
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  />{" "}
                  <div>
                    <div className="d-flex justify-content-center">
                      <hr
                        className="mt-4 mb-2"
                        style={{
                          width: "300px",
                          border: "2px solid #a2cc72",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <h5 className="my-2">
                      {profile.firstName} {profile.lastName}
                    </h5>

                    <p className="text-muted mb-2">{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {profile.firstName} {profile.lastName}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profile.phoneNumber}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Birth Day</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profile.birthDate}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Gender</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profile.gender}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{profile.address}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {profile.userCredential.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-green"
                  onClick={() => ToEditProfile()}
                  style={{ fontSize: "20px" }}
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="btn btn-green ms-2"
                  onClick={() => ToEditPassword()}
                  style={{ fontSize: "20px" }}
                >
                  Edit Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
