import React, { useState, useEffect } from 'react';

const ProfileEdit = ({  db,
                        token,
                        handleLoginSuccess
                    }) => {

  const [username, setUsername] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  
  // Login status
  const CHANGE_USERNAME = "CHANGE_USERNAME";
  const CHANGE_PASSWORD = "CHANGE_PASSWORD";
  const [changeStatus, setChangeStatus] = useState(null);

  const handleSubmit = async (event, change_type) => {
    event.preventDefault();
    
    if (change_type === CHANGE_USERNAME) {
      // Change username
      if (username) {
        if (username.length > 3) {
          console.log("Change username to", username);
          await db.updateProfile(token, {username: username})
        }
      }
    } else if (change_type === CHANGE_PASSWORD) {
      // Change password
      if ((newPassword1 === newPassword2) && (newPassword1 !== "")) {
        await db.updateProfile(token, {password: newPassword1})
        console.log("Change password to", newPassword1);
      } else {
        console.log("Invalid password");
        setNewPassword1('');
        setNewPassword2('');
      }
    };
    // Log off
    handleLoginSuccess("LOGIN_REQUIRED");
  };

  useEffect(() => {
    console.log("loginStatus|token updated to:", changeStatus, "|", token);
  }, [changeStatus, token]);
  
  return (
    <>
      <form className="login-bar" onSubmit={(e) => handleSubmit(e, changeStatus)}>
        { !changeStatus &&
        <div className="login-cell">
          <button className="task-button" type="submit" onClick= {() => setChangeStatus(CHANGE_USERNAME) }>Change username</button>
          <button className="task-button" type="submit" onClick= {() => setChangeStatus(CHANGE_PASSWORD) }>Change password</button>
        </div> 
        }

        { changeStatus === CHANGE_USERNAME && 
        <div className="login-cell">
          <label>
            New username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div> }

        { changeStatus === CHANGE_PASSWORD &&
        <>
        <div className="login-cell">
          <label>
            New password:
            <input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
          </label>
        </div>
        <div className="login-cell">
          <label>
            New password (repeat):
            <input type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
          </label>
        </div> 
        </>}
        
        { changeStatus && 
        <div className="login-cell">
          <button className="task-button" type="submit">Confirm</button>
          <button className="task-button" type="cancel" onClick={() => setChangeStatus(null)}>Cancel</button>
          </div> }
      </form>
    </>
  );
}

export default ProfileEdit;
