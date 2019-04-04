import React, { Component } from 'react';
import apiUrl from "../apiConfig";


class Posts extends Component {


    render() {
        return (
            < div >
                <div className="skillContainer" >
                    <h2>{this.props.post.title}</h2>
                    <br />
                    <br />
                    <p>{this.props.post.body}</p>
                    <p style={{ color: "gray" }}>has experience with {this.props.skill[this.props.post.skill_id - 1].name}</p>
                    <p style={{ color: "blue" }} >contact: {this.props.post.contact}</p>
                </div>
            </div >
        );
    }
}

export default Posts;