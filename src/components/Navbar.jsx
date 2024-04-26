import React from 'react';

const Navbar = ({ isLoggedIn,
                  handleList,
                  handleLogout,
               }) => {

  return (
    <div className="nav-bar">Navbar: 
        <div className="nav-action">
            <button className="nav-button" onClick={handleLogout}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
        {isLoggedIn && 
        <div className="nav-cell">
            <button className="nav-button" onClick={handleList}>Lists</button>
        </div>}
    </div>
  );
}

export default Navbar;