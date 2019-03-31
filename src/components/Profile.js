import React, { Component } from 'react';
import Skill from './Skill';
import Project from './Project';
import { getUser } from "../services/AuthService";
import apiUrl from "../apiConfig";



class Profile extends Component {
    state = {
        name: null,
        skills: [{ skill: "JavaScript", level: "75" }, { skill: "CSS", level: "55" }, { skill: "React", level: "45" }],
        projects: [{
            name: "Tic Tac toe ", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
            link: "https://rawanah995.github.io/project1/gamePage.html"
        }],
        contact: {},
        addSkill: "hide",
        skillvalue: 30,

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
    componentDidMount() {
        let url = `${apiUrl}/user-info`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => {
                console.log(res);
                this.setState({ name: res.data.name })

            })
            .then(data => {

            })
            .catch(e => console.log(e));


    }

    render() {
        const skillslist = this.state.skills.map(skill => <Skill skill={skill} />)
        const projectslist = this.state.projects.map(project => <Project project={project} />)

        return (

            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div class="profile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWtki1YgcOFiW4OyQzrjkzQ1S8gim4as8AuEtwYporPArAIzcJ-A" />
                    <h1>{this.state.name}</h1>

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                         scrambled it to make a type specimen book. It has survived not only five centuries
                         </p>
                    <div class="contact profile">
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-github"></i></a>
                    </div>
                </div>
                <div class="info">
                    <div class="container">
                        <h1>Skills</h1>
                        <h2 onClick={this.hideForm}>+</h2>
                        {skillslist}
                        <div id={this.state.addSkill}>
                            <h2>New skill</h2>
                            <div class="skillContainer " >
                                <form>

                                    <select>
                                        <option value="0">Skill</option>
                                        <option value="1">JavaScript</option>
                                        <option value="2">Rails</option>

                                    </select>
                                    <div class="slidecontainer">
                                        <input type="range" min="1" max="100" value={this.state.skillvalue} class="slider"
                                            onChange={this.skillvalue} />
                                        <button type="submit">Add</button>
                                    </div>
                                </form>
                            </div>
                            <p>Value:{this.state.skillvalue}</p>

                        </div>
                    </div>
                    <h1>Projects</h1>
                    {projectslist}
                    <h1>Contact</h1>
                </div>
            </div >

        );
    }
}

export default Profile;
