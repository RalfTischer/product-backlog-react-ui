import React from 'react';

const Navbar = ({ isLoggedIn,
                  handleList,
                  handleProfile,
                  handleLogout,
               }) => {

  return (
    <div className="nav-bar">
        {!isLoggedIn &&
        <div className="nav-action">
          Login to continue...
        </div>}

        {isLoggedIn && 
        <div className="nav-cell">
          <button className="nav-button" onClick={handleList}>My Lists</button>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
          <button className="nav-button" onClick={handleProfile}>Edit Profile</button>
        </div>}
    </div>
  );
}

export default Navbar;
