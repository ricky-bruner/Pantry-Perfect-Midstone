import React from "react";
import { Component } from "react";
import "./login.css";
import loginAnimation from "../../modules/LoginAnimation";
import DataManager from "../../modules/DataManager";
import PantryLogo from "./PantryLogo.png";

export default class Login extends Component {
    state = {
        username: "",
        password: "",
        registerUsername: "",
        registerPassword: "",
        registerEmail: "",
        isRegistered: false,
        missedField: false
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        if(!this.state.username && !this.state.password){
            loginAnimation(e)
            document.querySelector("#registerEmail").value = "";
            document.querySelector("#registerUsername").value = "";
            document.querySelector("#registerPassword").value = "";
            this.setState({registerEmail: "", registerUsername: ""})
        } else if(this.state.username && this.state.password){
            DataManager.getUser(this.state.username).then((user)=>{
                if(user.length !== 0){
                    sessionStorage.setItem("user", JSON.stringify(user))
                    this.props.history.push("/userpage")
                } else {
                    this.setState({missedField: true})
                }
            })
        }
    }

    handleRegister = (e) => {
        if(!this.state.registerUsername && !this.state.registerEmail){
            loginAnimation(e)
            document.querySelector("#password").value = "";
            document.querySelector("#username").value = "";
            this.setState({email: "", username: "", missedField: false})
        } else if(this.state.registerUsername && this.state.registerEmail){
            DataManager.getUser(this.state.registerUsername)
            .then((user)=>{
                if(user.length !== 0){
                    this.setState({isRegistered: true})
                } else {
                    let newUser = {
                        username: this.state.registerUsername,
                        password: this.state.registerPassword,
                        email: this.state.registerEmail,
                        image: "Edit your profile to add an image!",
                        birthday: "Edit your profile to add your birthday"
                    }
                    DataManager.add("users", newUser)
                    .then(()=> alert("You've successfully contributed to the decline of western civilization. Congrats to you."))
                }
            })
        }
    }
    
    
    render() {
        return (    
            <div className="login-container">
                <div className="form-collection">
                    <div className="login-card elevation-3 limit-width log-in-card below turned">
                        <div className="card-body">
                            <h2>Register</h2>
                            <div className="input-group username">
                                <input type="text" placeholder="Create a Username" id="registerUsername" defaultValue={this.state.registerUsername} onChange={this.handleFieldChange} />
                            </div>
                            <div className="input-group email">
                                <input type="text" placeholder="Register Your Email" id="registerEmail" defaultValue={this.state.registerEmail} onChange={this.handleFieldChange} />
                            </div>
                            <div className="input-group password">
                                <input type="password" placeholder="Create a secure Password" id="registerPassword" defaultValue={this.state.registerPassword} onChange={this.handleFieldChange} />
                            </div>
                            
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="signup-btn" onClick={this.handleRegister}>Sign Up</button>
                        </div>
                    </div>
                    <div className="login-card elevation-2 limit-width sign-up-card above">
                        <div className="card-body">
                            <img src={PantryLogo} alt="Logo" className="logo" />
                            <div className="input-group username">
                                <input type="text" placeholder="Username" id="username" onChange={this.handleFieldChange} />
                            </div>
                            <div className="input-group password">
                                <input type="password" placeholder="Password" id="password" onChange={this.handleFieldChange} />
                            </div>
                            {
                                this.state.missedField &&
                                <p className="error">Invalid username or password</p>
                            }
                            
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="login-btn" onClick={this.handleLogin}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}