import React, { useState, useEffect } from 'react';

const Navbar = ({  isLoggedIn,
                   handleLogout: handleLogout
               }) => {

  return (
    <div className="nav-bar">Navbar: 
        <div className="nav-action">
            <button className="nav-button" onClick={handleLogout}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
        {isLoggedIn && 
        <div className="nav-cell">
            <button className="nav-button">Lists</button>
        </div>}
    </div>
  );
}

export default Navbar;
