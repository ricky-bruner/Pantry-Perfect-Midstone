import React from "react";
import { Component } from "react";
import "./login.css";
import loginAnimation from "../modules/LoginAnimation";
import DataManager from "../modules/DataManager";

export default class Login extends Component {
    state = {
        username: "",
        email: "",
        registerUsername: "",
        registerEmail: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        if(!this.state.username && !this.state.email){
            loginAnimation(e)
            document.querySelector("#registerEmail").value = "";
            document.querySelector("#registerUsername").value = "";
            this.setState({registerEmail: "", registerUsername: ""})
        } else if(this.state.username && this.state.email){
            DataManager.getAll("users").then((users)=>{
                let loginUser = users.find(user => user.username === this.state.username && user.email === this.state.email)
                if(loginUser){
                    console.log("hello")
                    sessionStorage.setItem("user", JSON.stringify(loginUser))
                    this.props.history.push("/userpage")
                } else {
                    alert("Please actually login")
                }
            })
        }
    }

    handleRegister = (e) => {
        if(!this.state.registerUsername && !this.state.registerEmail){
            loginAnimation(e)
            document.querySelector("#email").value = "";
            document.querySelector("#username").value = "";
            this.setState({email: "", username: ""})
        } else if(this.state.registerUsername && this.state.registerEmail){
            DataManager.getAll("users").then((users)=>{
                let loginUser = users.find(user => user.username === this.state.registerUsername && user.email === this.state.registerEmail)
                console.log(loginUser)
                if(loginUser){
                    alert("this user or email is already taken")
                } else {
                    let newUser = {
                        username: this.state.registerUsername,
                        email: this.state.registerEmail,
                        bio: "Edit your profile to add a bio",
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
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="signup-btn" onClick={this.handleRegister}>Sign Up</button>
                        </div>
                    </div>
                    <div className="login-card elevation-2 limit-width sign-up-card above">
                        <div className="card-body">
                            <h2>Welcome to NutShell</h2>
                            {/* <small>Another dumb-ass Social Network</small> */}
                            <div className="input-group username">
                                <input type="text" placeholder="Username" id="username" onChange={this.handleFieldChange} />
                            </div>
                            <div className="input-group email">
                                <input type="email" placeholder="Email" id="email" onChange={this.handleFieldChange} />
                            </div>
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