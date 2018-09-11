import React, { Component } from "react"
import "./navBar.css";
import PantryLogo from "../../PerfectPantry.png";

export default class NavBar extends Component {
    
    handleLogout = () => {
        sessionStorage.removeItem("user");
        this.props.props.history.push("/login");
    }

    render(){
        return (
            <div className="main-nav">
                <div className="nav-left">
                    <img src={PantryLogo} alt="Pantry Logo" className="logo" />
                    <h3>Welcome Back, {this.props.user.username}</h3>
                </div>
                <div className="nav-right">
                    <button className="logout-btn" onClick={this.handleLogout}>Log out</button>
                </div>
            </div>
        )
    }
}