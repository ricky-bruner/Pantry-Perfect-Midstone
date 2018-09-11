import React, { Component } from "react";
import NavBar from "./nav/NavBar";

export default class UserPage extends Component {
    state = {
        user: {}
    }

    componentDidMount(){
        let newState = {};
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        newState.user = user;
        this.setState(newState)
    }

    render(){
        return (
            <div>
                <NavBar user={this.state.user} />
                <h1>Hello Friend!</h1>
            </div>
        )
    }
}