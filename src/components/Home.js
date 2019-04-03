import React, { Component } from 'react';
import Users from './Users';
import { getUser } from "../services/AuthService";
import apiUrl from "../apiConfig";
import Profile from './Profile';


class Home extends Component {

    state = {
        users: [],
        activePage: "users",
        userId: null,
        skills: [],
        formData: {
            id: null,
            level: null
        }
    }

    changeActivePage = activePage => {
        this.setState({ activePage });
    };
    handleChange = ({ currentTarget }) => {
        const formData = { ...this.state.formData };
        formData[currentTarget.name] = currentTarget.value;
        this.setState({ formData });
        console.log(this.state.formData)
    };
    userid = user_id => {
        console.log("iiiiiiiddddddddd", user_id);
        this.state.userId = user_id;
        console.log(this.state.userId)
    }
    find = () => {
        var level;
        if (this.state.formData.level === "Beginner") { level = 25 }
        if (this.state.formData.level === "Intermediate") { level = 50 }
        if (this.state.formData.level === "Advanced") { level = 75 }
        let url3 = `${apiUrl}/search/users?id=${this.state.formData.id}&level=${level}`;

        fetch(url3, {
            mode: "cors",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                //  console.log("id", id);
                // console.log("dddddddddddd", data.skill[0]);

                this.setState({ users: data.users })
            })
            .catch(e => console.log(e));
    }
    componentDidMount() {
        let url2 = `${apiUrl}/skills`;
        fetch(url2, {
            mode: "cors",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {



                this.setState({ skills: data.skills });

            })
            .catch(e => console.log(e));

        let url = `${apiUrl}/users`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ users: data.users })
                console.log(this.state.users);

            })
            .catch(e => console.log(e));
    }
    render() {
        const user = this.state.users.map(user => <Users user={user} userid={this.userid} changeActivePage={this.changeActivePage} />)
        const level = <select class="form-control" name="level"
            onChange={this.handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
        </select>
        const skillsList = this.state.skills.map(skill => <option value={skill.id}>{skill.name}</option>)

        const userslist = <div>
            <div style={{ padding: "30px", width: "100%", background: "gray" }}>
                <select name="id" class="form-control"
                    onChange={this.handleChange}>
                    {skillsList}
                </select>
                {level}
                <button class="btn btn-default" onClick={this.find}>Find</button>
            </div>

            <div className="container">

                <div>
                    {user}
                </div>
            </div>

        </div >
        return (
            <div>
                {this.state.activePage === "users" ? userslist : ""}
                {this.state.activePage === "profile" ? <Profile id={this.state.userId} /> : ""}
            </div>
        );
    }
}

export default Home;
