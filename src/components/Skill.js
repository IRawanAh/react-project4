import React, { Component } from 'react';
import apiUrl from "../apiConfig";


class Skill extends Component {
    state = {
        color: ""
    }

    handleDeleteSkillRequest = () => {
        var user_id = this.props.skill.userskills.user_id;
        var skill_id = this.props.skill.userskills.skill_id;
        console.log("deeellllleeeeetttteeee", user_id)
        let url = `${apiUrl}/user/${user_id}/skill`;
        fetch(url, {
            mode: "cors",
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ skill_id: skill_id })
        })
            .then(res => {
                res.json()
            })
            .then(data => {
                this.props.gettingUserSkills(user_id);
            })
            .catch(e => console.log(e))
    }
    componentDidMount() {
        if (this.props.skill.userskills.level >= 75) {
            this.setState({ color: "rgb(52, 156, 57)" })
        } else if (this.props.skill.userskills.level >= 50) {
            this.setState({ color: "rgb(237, 190, 51)" })
        } else {
            this.setState({ color: "rgb(255, 85, 0)" })
        }


    }
    render() {

        return (
            < div >
                <div className="skillContainer row" >

                    <h3 className="col-md-2 col-sm-1">{this.props.skill.name}</h3>
                    <div className="bar col-md-7 col-sm-1">
                        <div className="skills" id="level" style={{ width: this.props.skill.userskills.level + "%", backgroundColor: this.state.color }}>{this.props.skill.userskills.level + "%"}</div>
                    </div>
                    {(this.props.edit) ? <p className="col-md-2 col-sm-1" style={{ width: "10%", color: "red", display: "inline", cursor: "pointer", marginTop: "18px" }} onClick={this.handleDeleteSkillRequest}>Delete</p> : ""}
                </div>
            </div >
        );
    }
}

export default Skill;
