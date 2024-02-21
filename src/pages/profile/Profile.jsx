import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_CUSTOMER } from "../../constant/Endpoint";
import { jwtDecode } from "jwt-decode";

function Profile() {
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

  const userArrayString = localStorage.getItem("user");
  const userArray = JSON.parse(userArrayString);
  console.log(userArrayString);

  // Extract the token from the user array
  const token = userArray.token;
  // Now you can use the token as needed
  console.log("Token:", token);
  const decoded = jwtDecode(token);
  // console.log(decoded.customerId);

  useEffect(() => {
    const customerId = decoded.customerId;
    console.log("ini id customer : " + customerId);
    console.log("Token:", token);
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

      if (token) {
        fetchData();
      } else {
        console.error("Token not found in local storage");
        // Handle the case where the token is not present, redirect the user, etc.
      }
    } catch (error) {
      console.error("Error parsing user array", error.message);
      // Handle parsing errors
    }
  }, []);

  const { customerId } = useParams();
  console.log("ini customer id param : " + customerId);

  const ToEditProfile = () => {
    navigate("/editProfile", { customerId: "jjj" });
  };

  console.log("INI DARA PROFILE", profile);
  return (
    <section
      style={{
        backgroundColor: "#eee",
        display: "flex",
        width: "100%",
        height: "100vh",
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
                  src="src/assets/images/Profile.png"
                  alt="avatar"
                  className="rounded-circle img-fluid mt-1"
                  style={{ width: "150px", backgroundColor: "bisque" }}
                />{" "}
                <div>
                  <div className="d-flex justify-content-center">
                    <hr
                      className="mt-4 mb-2"
                      style={{
                        width: "300px",
                        border: "2px solid black",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <h5 className="my-2">
                    {profile.firstName} {profile.lastName}
                  </h5>

                  <p className="text-muted mb-2">{profile.address}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => ToEditProfile()}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
