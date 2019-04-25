import React, { Component } from 'react';



class Project extends Component {
    render() {

        return (
            <div class="skillContainer " >
                <h2 className="pl-4">{this.props.project.name}</h2>
                <p className="pl-4">{this.props.project.desc}</p>
                <a className="pl-4" href={this.props.project.link} >Project link </a>
            </div >
        );
    }
}

export default Project;
