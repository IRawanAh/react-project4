import React, { Component } from 'react';



class Skill extends Component {
    render() {

        return (
            <div>
                <div class="skillContainer" >

                    <h3>{this.props.skill.skill}</h3>
                    <div class="bar">
                        <div class="skills" id="level" style={{ width: this.props.skill.level + "%" }}>{this.props.skill.level + "%"}</div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Skill;
