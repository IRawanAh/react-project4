import React, { Component } from "react";
import apiUrl from "../apiConfig";
import { getUser } from "../services/AuthService";

class UserInfo extends Component {
    state = {
        formData: {
            name: null,
            location: null,
            github: null,
            twitter: null,
            linkedin: null
        }
    }
    componentDidMount() {

    }
    handleLoginRequest = data => {
        let url = `${apiUrl}/user-info`;
        console.log(getUser().email);
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email: getUser().email, data })
        })
            .then(res => {
                res.json()
            })
            .then(data => {
            })
            .catch(e => console.log(e));
        this.props.changeActivePage("profile");
    };

    handleSubmit = e => {
        e.preventDefault();
        this.handleLoginRequest(this.state.formData);
    };

    handleChange = ({ currentTarget }) => {
        const formData = { ...this.state.formData };
        formData[currentTarget.name] = currentTarget.value;
        this.setState({ formData });
        console.log(this.state.formData);
    };
    render() {

        return (
            <div>
                <h1>User Info</h1>
                <form onSubmit={this.handleSubmit}>
                    <h3>Name:</h3>
                    <input type="text" onChange={this.handleChange} name="name" />
                    <h3>Location:</h3>
                    <input type="text" onChange={this.handleChange} name="location" />
                    <h3>Github:</h3>
                    <input type="text" onChange={this.handleChange} name="github" />
                    <h3>Twitter:</h3>
                    <input type="text" onChange={this.handleChange} name="twitter" />
                    <h3>LinkedIn:</h3>
                    <input type="text" onChange={this.handleChange} name="linkedin" />
                    <button type='submit'>Save</button>

                </form>
            </div>
        );
    }
}

export default UserInfo;