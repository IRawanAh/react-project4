import React from "react";

const authenticatedOptions = (changeActivePage, onSignout) => (
  <React.Fragment>
    <li
      className="nav-item"
      onClick={() => changeActivePage("change-password")}
    >
      <div className="nav-link">Change Password</div>
    </li>
    <li className="nav-item" onClick={() => onSignout()}>
      <div className="nav-link">Sign Out</div>
    </li>
    <li className="nav-item" onClick={() => changeActivePage("profile")}>
      <div className="nav-link">Profile</div>
    </li>
    <li className="nav-item" onClick={() => changeActivePage("UserInfo")}>
      <div className="nav-link">Update profile</div>
    </li>
  </React.Fragment>
);

const unauthenticatedOptions = changeActivePage => (
  <React.Fragment>
    <li className="nav-item" onClick={() => changeActivePage("sign-in")}>
      <div className="nav-link">Sign In</div>
    </li>
    <li className="nav-item" onClick={() => changeActivePage("sign-up")}>
      <div className="nav-link">Sign Up</div>
    </li>

  </React.Fragment>
);

const alwaysOptions = changeActivePage => (
  <React.Fragment>
    <li className="nav-item" onClick={() => {
      window.location.reload()
      changeActivePage("home")
    }}>
      <div className="nav-link">Home</div>
    </li>
    <li className="nav-item" onClick={() => {
      // window.location.reload()
      changeActivePage("posts")
    }}>
      <div className="nav-link">Posts</div>
    </li>

  </React.Fragment>
);

const Nav = ({ user, changeActivePage, onSignout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="navbar-brand">Team-up</div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {alwaysOptions(changeActivePage)}

        {user
          ? authenticatedOptions(changeActivePage, onSignout)
          : unauthenticatedOptions(changeActivePage)}
        {/* {user && (
          <li className="nav-item">
            <div className="nav-link"> Hola, {user.email.split("@")[0]}</div>
          </li>
        )} */}
      </ul>
    </div>
  </nav>
);

export default Nav;
