import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { FaChevronLeft } from 'react-icons/fa';
import Alert from '@mui/material/Alert';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const sendResetPassowrd = () => {
    if (!success) {
      sendPasswordResetEmail(auth, email).then(() => {
        setSuccess('We sended you a mail with reset pasword link!');
      });
    }
  };
  return (
    <div className="window">
      <h3 className="title">Reset Password</h3>
      <form>
        <div className="row">
          {success && (
            <Alert className="alert" severity="success">
              {success}
            </Alert>
          )}
        </div>
        <p className="text">
          Enter your email below, you will receive an email with instructions on how to
          reset your password in a few minutes.
        </p>
        <div className="row">
          <div className="col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@mail.com"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" onClick={sendResetPassowrd} className="btn primary-btn">
              Send
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        <Link to="/login" className="btn link">
          <FaChevronLeft />
          Login
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
