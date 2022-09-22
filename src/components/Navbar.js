import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaAngleRight, FaAngleLeft,FaPlus } from 'react-icons/fa';
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
          onClick={() => showOptions(!optionsVisible)}
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
          {/* <button
            type="button"
            className="btn transparent-btn"
          >
            Settings
          </button> */}
        </div>
      </div>
      <div className="links">
        <NavLink to="/timeline" className="nav-link">
          Timeline
        </NavLink>
        <NavLink to="/tasks" className="nav-link">
          Tasks
        </NavLink>
      </div>
			<div className="links ">
				<button className="btn transparent-btn project-btn">
					<span>Projects</span>
					<FaPlus className="add-icon" size={15}/>
				</button>
        <NavLink to="/project/1" className="nav-link sub-link">
          School
        </NavLink>
        <NavLink to="/project/2" className="nav-link sub-link">
          Work
        </NavLink>
			</div>
			<div className="footer">
				<div className="logo">
					<span className="text">scheduler</span>
					<div className="cover"></div>
				</div>
			</div>
    </nav>
  );
}

export default Navbar;
