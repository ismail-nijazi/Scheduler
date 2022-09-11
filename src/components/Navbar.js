import React from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Navbar({visible, setVisibility}) {

  const navButtonOnClick = () => {
    setVisibility(!visible);
  };

  return (
    <nav className={!visible ? 'navbar' : ""}>
      <button type="button" className="nav-btn" onClick={navButtonOnClick}>
				{ !visible ?
					<FaAngleRight size={30} /> : <FaAngleLeft size={30}/>
				}
      </button>
      <div className="nav-profile">
        <div className="profile-image">
          <img src={require('../assets/images/profile.png')} alt="profile" />
        </div>
        <span>Username</span>
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
          Timeline
        </NavLink>
        <NavLink to="/project/2" className="nav-link">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
