import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../components/redux/UserSlice";
import { BASE_CUSTOMER, CHANGE_PASSWORD } from "../../constant/Endpoint";

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

    // const formDataToSend = new FormData();
    // formDataToSend.append("password", formData.userCredential.password);

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
    <div className="container-xl px-4 mt-4">
      <h1 className="display-6 fw-bold text-green">Edit Password</h1>
      <hr className="mt-0 mb-4" />
      <div className="row">
        {/* ... */}
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputPassword">
                    New Password
                  </label>
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="text"
                    placeholder="Enter your new Passowrd"
                    onChange={handlePasswordChange}
                  />
                </div>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;
