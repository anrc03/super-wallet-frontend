import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadSpinner from '../../components/LoadSpinner';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Swal from 'sweetalert2';

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Email cannot be empty");
            return;
        }
        setIsLoading(true);
        axios.post("http://localhost:8088/api/reset-password", { email })
            .then(response => {
                setIsLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password reset email has been sent successfully!',
                })
                navigate('/login');
            })
            .catch(error => {
                setIsLoading(false);
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: error.message
                });
            });
    };

    if (isLoading) return <LoadSpinner />;

    return (
        <div className="forgot-pass-backround">
            <Helmet>
                <title>Forgot Password | Super Wallet</title>
            </Helmet>
            <div className="container forgot-pass-container">
                <div className="col-md-5">
                    <form className='border forgot-pass-form' onSubmit={handleForgotPassword}>
                        <div className="row justify-content-center">
                            <img src="src/assets/images/Forgot-Password.png" alt="Forgot Password Picture" style={{ width: '300px' }} className="img-fluid" />
                        </div>
                        <div className="px-5">
                            <div className='forgot-password'>
                                <h4 className="mb-2" style={{ color: '#3a5a40', fontSize: 28, fontWeight: '600' }}>Forgot your password</h4>
                                <p className='mb-2'>Forgot the password? Please enter your email address. You will receive an email to enter the password we created to log in. <span>Please change your password later in your profile when you are logged in</span></p>
                                <label className='mb-2' style={{ color: '#3a5a40' }}>Email address<span className="text-danger"> *</span></label>
                                <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                                {error && <div className="text-danger">{error}</div>}
                                <span className="text-create">Remember your password? <Link to="/login" className="login-link">Log in</Link></span>
                            </div>
                            <button type="submit" className="btn forgot-pass-button mt-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;