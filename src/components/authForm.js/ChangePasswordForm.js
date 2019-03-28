import React, { Component } from "react";
import apiUrl from "../../apiConfig";
import { getUser } from "../../services/AuthService";
class ChangePasswordForm extends Component {
  state = {
    formData: {
      old: null,
      new: null
    },
    err: null
  };

  handleLoginRequest = passwords => {
    let url = `${apiUrl}/change-password`;

    console.log({ email: getUser().email, passwords });
    console.log(url);
    fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: getUser().email, passwords })
    })
      .then(res => res.json())
      .then(data => {
        this.props.changeActivePage("home");
      })
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleLoginRequest(this.state.formData);
  };

  handleChange = ({ currentTarget }) => {
    const formData = { ...this.state.formData };
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
  };

  render() {
    return (
      <div className="pt-5 mt-5">
        <h1>Change Password</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Old Password</label>
            <input
              name="old"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />
            <label>new Password </label>
            <input
              name="new"
              type="password"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default ChangePasswordForm;
