import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { showProfile } from '../store/slices/profile';

function ProfileView() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className={profile.visible ? 'modal' : 'modal hidden'}>
      <div className="profile">
        <div
          className="row close-btn"
        >
          <button
            type="button"
            className="btn transparent-btn"
            onClick={() => dispatch(showProfile(false))}
          >
            <FaTimes size={30} />
          </button>
        </div>
        <div className="head">
          <div className="profile-image">
            <img src={require('../assets/images/profile.png')} alt="profile" />
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col">
              <label htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="ismail@gmail.com"
              />
            </div>
            <div className="col">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="ismail@gmail.com"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Password</span>
              <button type="button" className="btn primary-btn">Reset Password</button>
            </div>
          </div>

          <div className="row footer">
            <div className="col">
              <button type="button" className="btn danger-btn">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
