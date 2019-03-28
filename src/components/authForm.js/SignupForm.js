import React, { Component } from "react";
import apiUrl from "../../apiConfig";
import { setJwtCookie, setUser } from "../../services/AuthService";
class SignupForm extends Component {
  state = {
    formData: {
      email: null,
      password: null,
      password_confirmation: null
    },
    err: null
  };

  handleLoginRequest = user => {
    let url = `${apiUrl}/sign-up`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ credentials: user })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) this.setState({ err: data.error });
        else {
          setJwtCookie(data.token);
          setUser(data.user);
          this.props.onSignin();
        }
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
        <h1>PLEASE SIGNUP</h1>
        {this.state.err ? (
          <div className="alert alert-warning"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>email </label>
            <input
              name="email"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />

            <label>Password Confirmation</label>
            <input
              name="password_confirmation"
              className="form-control"
              type="password"
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

export default SignupForm;
