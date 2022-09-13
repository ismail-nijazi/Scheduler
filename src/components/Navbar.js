import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { showProfile } from '../store/slices/profile';

function Navbar({ visible, setVisibility }) {
  const [optionsVisible, showOptions] = useState(false);
  const dispatch = useDispatch();

  const navButtonOnClick = () => {
    setVisibility(!visible);
  };

  return (
    <nav className={!visible ? 'navbar' : ''}>
      <button
        type="button"
        className="btn primary-btn nav-btn"
        onClick={navButtonOnClick}
      >
        { !visible
          ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
      </button>
      <div className="nav-profile">
        <button
          className="btn transparent-btn profile-btn"
          onClick={() => showOptions(true)}
          type="button"
        >
          <img src={require('../assets/images/profile.png')} alt="profile" />
        </button>
        <span>Username</span>
        <div className={optionsVisible ? 'options' : 'options hide'}>
          <button
            type="button"
            onClick={() => {
              dispatch(showProfile(true));
              showOptions(false);
            }}
            className="btn transparent-btn"
          >
            Profile
          </button>
          <button
            type="button"
            className="btn transparent-btn"
          >
            Settings
          </button>
        </div>
      </div>
      <div className="links">
        <NavLink to="/timeline" className="nav-link">
          Timeline
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
      </div>
      <h4 className="sub-title">Projects</h4>
      <div className="links ">
        <NavLink to="/project/1" className="nav-link">
          School
        </NavLink>
        <NavLink to="/project/2" className="nav-link">
          Work
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
