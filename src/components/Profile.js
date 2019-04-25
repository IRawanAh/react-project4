import React, { Component } from 'react';
import Skill from './Skill';
import Project from './Project';
import { getUser } from "../services/AuthService";
import apiUrl from "../apiConfig";



class Profile extends Component {
    state = {
        id: null,
        name: null,
        location: null,
        skills: [],
        formData: {
            id: 1,
            level: 30
        },
        userSkills: [],
        projects: [{
            name: "Tic Tac toe ", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
            link: "https://rawanah995.github.io/project1/gamePage.html"
        }],
        contact: {},
        addSkill: "hide",
        skillvalue: 30,
        edit: false,
        github: null,
        linkedin: null

    }
    hideForm = () => {
        if (this.state.addSkill === "false") {
            this.setState({ addSkill: "hide" });
        } else {
            this.setState({ addSkill: "false" });
        }
    }
    skillvalue = (event) => {
        const newData = event.target.value;
        this.setState({ skillvalue: newData });


    }
    handleChange = ({ currentTarget }) => {
        const formData = { ...this.state.formData };
        formData[currentTarget.name] = currentTarget.value;
        this.setState({ formData });
        console.log(this.state.formData)
    };
    handleSubmit = e => {
        this.handleAddSkillRequest(this.state.formData);
    };
    handleAddSkillRequest(data) {
        let url = `${apiUrl}/user/${this.state.id}/skill`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ data })
        })
            .then(res => {
                res.json()
            })
            .then(data => {
                console.log('handleAddSkillRequest: ', data)
                this.gettingUserSkills(this.state.id);
            })
            .catch(e => console.log(e));
    };



    componentDidMount() {
        if (this.props.id != null) {
            let url = `${apiUrl}/user-info/${this.props.id}`;
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
                    this.setState({ name: data.user.name })
                    this.setState({ id: data.user.id })
                    var id = data.user.id;
                    console.log(id);
                    this.setState({ location: data.user.location })
                    this.setState({ github: data.user.github })
                    this.setState({ linkedin: data.user.linkedin })
                    this.gettingUserSkills(id);
                })
                .catch(e => console.log(e));
        }
        else {
            let url = `${apiUrl}/user-id/${getUser().email}`;
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
                    this.setState({ name: data.user.name })
                    this.setState({ id: data.user.id })
                    var id = data.user.id;
                    console.log(id);
                    this.setState({ location: data.user.location })
                    this.setState({ linkedin: data.user.linkedin })
                    this.setState({ edit: true })
                    this.gettingUserSkills(id);
                })
                .catch(e => console.log(e));
        }

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



    }

    gettingUserSkills = (id) => {
        let url3 = `${apiUrl}/user/${id}/skills`;

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
                console.log("id", id);
                console.log("dddddddddddd", data.skill[0]);
                var skills = data.skill;

                this.setState({ userSkills: skills })
            })
            .catch(e => console.log(e));

    }
    render() {
        const skillsList = this.state.skills.map(skill => <option value={skill.id}>{skill.name}</option>)
        const userSkillslist = this.state.userSkills.map(skill => <Skill gettingUserSkills={this.gettingUserSkills} edit={this.state.edit} skill={skill} />)
        const projectslist = this.state.projects.map(project => <Project project={project} />)

        return (

            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="profile">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLfo6eqqsLTU19mzuLu3vL/Z3N6+wsXGyszR1NbN0NLJzc/c3+Ds7u/h4+TqYnFJAAACxElEQVR4nO2ayXLDIAxAQZjVdvn/v623pEtikByJzGR4l7YnXiXEJivV6XQ6nU6n0+l0Oh8JgFL5+PmW4f0UglsIcczNJUANwRh9Y/k1+pYOkKdlVP0POzRzgGQfht8i4eYmDqDc0/E3h6mBAvjT8bcwZHGBsTD+qqCFMwFjKQI7olGAoS6gtaRAcQ7csXIGGTP+MheC1FSAgDPQRmptQk2CHRkDQI+vdZRQgIQPgVBJWoKAyPKMq8QbAhWJLoQjCAO7AXItuMO/JhBKcYdbACJRQHtuA0olrJiROw3UELBPhJls4JgNBrIB995ALgVtmA0SOQTdgN/g/TPRkwXsx60HlCPahuE+qIGjKiReAQUTdUmamQ2IhzQtcWAnpoH/vE48ohj2JCz1SEqD4xdQinJYNkni0kQJgswFnnBjkLo8468M3CvyDfyqJFAIh0JAKchMwwPMrYF9T/oDYirIvSLtVM8JRmoW3oD8/FW7VQQ2StOR/7b4jPOnZWMbtTkgPw9DmwDcHf73WIwd2/aa1kaT1eZAu+hV84YbQJ6HNMU4Jj+3H34VWPg6WH9vO3b2wxiDs3rLg7YuxCn53KL1CSr7aTsn/J2Ix18uDqIJAeUnZ02x07VOykGJWAD4WB79V0BCYs8HzPGxyVqMRfCMEsu/T3tU3nGJKxngz5us5UDYkcMBZtzR7MTh5UPz2SaEd3ixGw70B6xHh/hKKl4MwKFwOQzgSQVYcrh2cKD11ioK4YpA5BO49F0C8nqEh3qbZhegKggI0BToT3co8C87uC8t6ODvU1lGAH+tpz/g4hVQNSk0CXZQKxO1wUwC88QlUog/IEqS3sogUd+kiJ8ZXKCaBtEc6PqnEbUP3xioLUviSdDmzUmopoHcy7lA8cETJnmB8hYpX4sLtrg5yG1Kvyi9vGdrGlD8SgdaUBLodDqdznv5BtU9HtL6MEh1AAAAAElFTkSuQmCC" />
                    <h1>{this.state.name}</h1>
                    <h4>{this.state.location}</h4>

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                         scrambled it to make a type specimen book. It has survived not only five centuries
                         </p>
                    <div className="contact profile">
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href={this.state.linkedin}><i className="fa fa-linkedin"></i></a>
                        <a href={this.state.github}><i className="fa fa-github"></i></a>
                    </div>
                </div>
                <div className="info">
                    <div className="container">

                        <h1>Skills</h1>
                        {this.state.edit ? <h2 style={{ cursor: "pointer" }} onClick={this.hideForm}>+</h2> : ""}
                        {userSkillslist}
                        <div id={this.state.addSkill}>
                            <h2>New skill</h2>
                            <div className="skillContainer slidecontainer row " >
                                <select name="id" className="form-control col-md-2 col-sm-1" onChange={this.handleChange}>
                                    {skillsList}
                                </select>

                                <input type="range" min="1" max="100" name="level" value={this.state.formData.level} className="slider col-md-6 col-sm-1"
                                    onChange={this.handleChange} />
                                <p style={{ marginTop: "20px !important" }} className="col-md-1 col-sm-1" >{this.state.formData.level <= 50 ? "Beginner" : this.state.formData.level <= 75 ? "Intermediate" : "Advanced"}</p>
                                <button class="btn btn-default col-md-1 col-sm-1" onClick={this.handleSubmit}>Add</button>


                            </div>
                            <p>Value:{this.state.formData.level}</p>

                        </div>

                        <br />
                        <h1>Projects</h1>
                        {projectslist}
                    </div>
                </div>
            </div >

        );
    }
}

export default Profile;
