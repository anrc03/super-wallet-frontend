import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";
import { BASE_CUSTOMER, CHANGE_PASSWORD } from "../../constant/Endpoint";
import { Helmet } from "react-helmet";

function EditPassword() {
  const [formData, setFormData] = useState({
    id: "",
    userCredential: {
      password: "",
    },
  });

  const user = useSelector(selectUser);
  const customerId = user.customerId;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_CUSTOMER}/${customerId}`)
      .then((response) => {
        const userData = response.data.data;
        setFormData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [customerId]);

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      userCredential: {
        ...formData.userCredential,
        password: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${CHANGE_PASSWORD}`, {
        password: formData.userCredential.password,
      });

      if (response.status === 200) {
        console.log("sukses ubah passowrd");
        navigate("/profile");
      } else {
        console.error("Update failed:", response.data);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <div className="forgot-pass-backround">
      <Helmet>
        <title>Change Password | Super Wallet</title>
      </Helmet>
      <div className="container forgot-pass-container">
        <div className="col-md-5">
          <form className="border forgot-pass-form">
            <div className="px-5">
              <div className="forgot-password">
                <h4
                  className="mb-2"
                  style={{ color: "#3a5a40", fontSize: 28, fontWeight: "600" }}
                >
                  Change your password
                </h4>
                <p className="mb-2">
                  Enter your new password below. You can use this password to
                  log in later.
                </p>
                <label className="mb-2" style={{ color: "#3a5a40" }}>
                  New Password
                </label>
                <input
                  className="form-control mb-2"
                  type="password"
                  placeholder="Enter your new Password"
                  onChange={handlePasswordChange}
                />
              </div>
              {/* <button
                className="btn btn-green mt-1"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  console.log("Go Back button clicked");
                  navigate(-1);
                }}
              >
                Go Back
              </button> */}
              <button
                type="submit"
                className="btn btn-green"
                style={{ fontSize: "20px" }}
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;
