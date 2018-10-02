import React, { Component } from "react"
import "./navBar.css";
import PantryLogo from "../../PerfectPantry.png";
import { Button } from "semantic-ui-react";

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
                </div>
                <div className="nav-header">
                    <h2>Welcome, <span className="logo-font">{this.props.user.username}</span>!</h2>
                    <h5>Shall we find something to cook?</h5>
                </div>
                <div className="logout-container">
                    <div>
                        <Button basic color='teal' content='Log Out' size="mini" onClick={this.handleLogout} />
                    </div>
                </div>
            </div>
        )
    }
}