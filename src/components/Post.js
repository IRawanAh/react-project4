import React, { Component } from 'react';
import Profile from './Profile';
import apiUrl from "../apiConfig";
import Posts from './Posts';
import { getUser } from "../services/AuthService";

class Post extends Component {
    state = {
        skills: [],
        posts: [],
        formData: {
            title: null,
            body: null,
            skill: null,
            contact: null
        },
        skillIdArr: [],
        user_id: null
    }
    handleChange = ({ currentTarget }) => {
        const formData = { ...this.state.formData };
        formData[currentTarget.name] = currentTarget.value;
        this.setState({ formData });
        console.log(this.state.formData)
    }
    reset = () => {
        const formData = { ...this.state.formData };
        formData = formData.map(d => { return '' });
        this.setState({ formData });
    }

    getPosts = () => {
        let url = `${apiUrl}/posts`;
        fetch(url, {
            mode: "cors",
            credentials: "include",

            method: "GET",
            headers: {
                "Content-type": "application/json",

            }
        })
            .then(res => res.json())
            .then(data => {

                var userposts = [];
                var posts = data.posts;
                if (getUser() != null) {
                    this.state.skillIdArr.map(id => {
                        posts.map(post => {
                            console.log("kkkkkkkkk", post)
                            if (post.skill_id == id) {
                                userposts.push(post);
                                this.setState({ posts: userposts })
                            }
                        })
                        console.log(id)
                    })
                }
                else {
                    this.setState({ posts: posts })
                }
                console.log(userposts)
                //this.setState({ posts: data.posts });
                console.log(this.state.posts);
            })
            .catch(e => console.log(e));
    }
    getUserId = () => {
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

                // console.log(data);
                // this.setState({ name: data.user.name })
                this.setState({ user_id: data.user.id })
                this.gettingUserSkills(data.user.id);

                // var id = data.user.id;
                // console.log(id);
                // this.setState({ location: data.user.location })
                // this.setState({ edit: true })
                // this.gettingUserSkills(id);
            })
            .catch(e => console.log(e));

    }
    componentDidMount() {
        if (getUser() != null) {
            console.log("Lllllllllllllhhhhhhhhhhhhhh")
            this.getUserId();
        } else {
            this.getPosts();
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


    handleSubmit = e => {
        e.preventDefault();
        this.handleAddSkillRequest(this.state.formData);
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
                var skillIdArr = data.skill.map(skill => skill.id)
                console.log("dddddddddddd", skillIdArr)
                this.setState({ skillIdArr })
                this.getPosts();

            })
            .catch(e => console.log(e));

    }
    handleAddSkillRequest(data) {
        let url = `${apiUrl}/post`;
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
                this.getPosts();
            })
            .catch(e => console.log(e));
    };
    render() {

        const skillsList = this.state.skills.map(skill => <option value={skill.id}>{skill.name}</option>)
        const postslist = this.state.posts.map(post => <Posts skill={this.state.skills} post={post} />)
        const postform = <div class="row">
            <div className="col-sm-3 postform" >
                <h1>New post</h1>
                <form onSubmit={this.handleSubmit}>
                    <h3>Title</h3>
                    <input class="form-control" type="text" onChange={this.handleChange} name="title" />
                    <h3>Body</h3>
                    <textarea onChange={this.handleChange} class="form-control" rows="5" name="body" id="comment"></textarea>
                    <br />
                    <select style={{ width: "100% !important" }} onChange={this.handleChange} name="skill" className="form-control post">
                        {skillsList}
                    </select>
                    <h3>Contact</h3>
                    <input class="form-control" type="text" onChange={this.handleChange} name="contact" />
                    <br />
                    <button class="btn btn-primary" type='submit'>Post</button>
                </form>
            </div>
            <div class="col-sm-8 post">
                {postslist}
            </div>

        </div>
        return (
            <div class="container">
                {getUser() ? postform : <div class="col-sm-8">
                    {postslist}
                </div>}



            </div >
        );
    }
}

export default Post;
