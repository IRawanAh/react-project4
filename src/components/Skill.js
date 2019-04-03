import React, { Component } from 'react';
import apiUrl from "../apiConfig";


class Skill extends Component {


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
                // console.log('handleAddSkillRequest: ', data)
                this.props.gettingUserSkills(user_id);
            })
            .catch(e => console.log(e))
    }

    render() {

        return (
            < div >
                <div className="skillContainer" >

                    <h3>{this.props.skill.name}</h3>
                    <div style={{ display: "inline-block", width: "60%" }} className="bar">
                        <div className="skills" id="level" style={{ width: this.props.skill.userskills.level + "%" }}>{this.props.skill.userskills.level + "%"}</div>
                    </div>
                    {(this.props.edit) ? <h3 style={{ width: "10%" }} onClick={this.handleDeleteSkillRequest}>x</h3> : ""}
                </div>
            </div >
        );
    }
}

export default Skill;
