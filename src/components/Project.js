import React, { Component } from 'react';



class Project extends Component {
    render() {

        return (
            <div class="skillContainer" >
                <h2>{this.props.project.name}</h2>
                <p>{this.props.project.desc}</p>
                <a href={this.props.project.link} >Project link </a>
            </div >
        );
    }
}

export default Project;
