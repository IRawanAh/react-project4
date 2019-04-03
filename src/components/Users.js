import React, { Component } from 'react';
import Profile from './Profile';



class Users extends Component {
    state = {
        activePage: "users"
    }
    profilePage = () => {
        console.log("clicked");
        this.props.userid(this.props.user.id);
        this.props.changeActivePage("profile");

    }
    render() {
        const user = <div className="skillContainer" onClick={this.profilePage}>
            <img style={{ display: "inline ", width: "100px", height: "100px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLfo6eqqsLTU19mzuLu3vL/Z3N6+wsXGyszR1NbN0NLJzc/c3+Ds7u/h4+TqYnFJAAACxElEQVR4nO2ayXLDIAxAQZjVdvn/v623pEtikByJzGR4l7YnXiXEJivV6XQ6nU6n0+l0Oh8JgFL5+PmW4f0UglsIcczNJUANwRh9Y/k1+pYOkKdlVP0POzRzgGQfht8i4eYmDqDc0/E3h6mBAvjT8bcwZHGBsTD+qqCFMwFjKQI7olGAoS6gtaRAcQ7csXIGGTP+MheC1FSAgDPQRmptQk2CHRkDQI+vdZRQgIQPgVBJWoKAyPKMq8QbAhWJLoQjCAO7AXItuMO/JhBKcYdbACJRQHtuA0olrJiROw3UELBPhJls4JgNBrIB995ALgVtmA0SOQTdgN/g/TPRkwXsx60HlCPahuE+qIGjKiReAQUTdUmamQ2IhzQtcWAnpoH/vE48ohj2JCz1SEqD4xdQinJYNkni0kQJgswFnnBjkLo8468M3CvyDfyqJFAIh0JAKchMwwPMrYF9T/oDYirIvSLtVM8JRmoW3oD8/FW7VQQ2StOR/7b4jPOnZWMbtTkgPw9DmwDcHf73WIwd2/aa1kaT1eZAu+hV84YbQJ6HNMU4Jj+3H34VWPg6WH9vO3b2wxiDs3rLg7YuxCn53KL1CSr7aTsn/J2Ix18uDqIJAeUnZ02x07VOykGJWAD4WB79V0BCYs8HzPGxyVqMRfCMEsu/T3tU3nGJKxngz5us5UDYkcMBZtzR7MTh5UPz2SaEd3ixGw70B6xHh/hKKl4MwKFwOQzgSQVYcrh2cKD11ioK4YpA5BO49F0C8nqEh3qbZhegKggI0BToT3co8C87uC8t6ODvU1lGAH+tpz/g4hVQNSk0CXZQKxO1wUwC88QlUog/IEqS3sogUd+kiJ8ZXKCaBtEc6PqnEbUP3xioLUviSdDmzUmopoHcy7lA8cETJnmB8hYpX4sLtrg5yG1Kvyi9vGdrGlD8SgdaUBLodDqdznv5BtU9HtL6MEh1AAAAAElFTkSuQmCC" />
            <div style={{ display: "inline" }}>
                <h2 style={{ display: "inline" }}>{this.props.user.name}</h2>
                <p style={{ paddingLeft: "100px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                     scrambled it to make a type specimen book. It has survived not only five centuries
             </p>
            </div>
        </div>
        const profile = <Profile />
        return (
            <div>

                {this.state.activePage === "users" ? user : (profile)}

            </div >
        );
    }
}

export default Users;
