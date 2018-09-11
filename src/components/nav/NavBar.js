import React, { Component } from "react"
import "./navBar.css";
import PantryLogo from "../../PerfectPantry.png";

export default class NavBar extends Component {
    render(){
        return (
            <div className="main-nav">
                <div className="nav-left">
                    <img src={PantryLogo} alt="Pantry Logo" className="logo" />
                    <h3>Welcome Back, {this.props.user.username}</h3>
                </div>
                <div className="nav-right">
                    <button className="logout-btn">Log out</button>
                </div>
            </div>
        )
    }
}