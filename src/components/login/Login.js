import React from "react";
import { Component } from "react";
import "./login.css";
import loginAnimation from "../../modules/LoginAnimation";
import DataManager from "../../modules/DataManager";
import PantryLogo from "../../PerfectPantry.png";
import { Message, Input } from "semantic-ui-react";

export default class Login extends Component {
    state = {
        username: "",
        password: "",
        registerUsername: "",
        registerPassword: "",
        registerEmail: "",
        isRegistered: false,
        noUser: false,
        usernameEmpty: false,
        passwordEmpty: false,
        rUsernameEmpty: false, 
        rEmailEmpty: false, 
        rPasswordEmpty: false,
        registerSuccess: false
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
            this.setState({
                registerEmail: "", 
                registerUsername: "", 
                registerPassword: "", 
                isRegistered: false,
                username: "",
                password: "",
                noUser: false,
                usernameEmpty: false,
                passwordEmpty: false,
                rUsernameEmpty: false, 
                rEmailEmpty: false, 
                rPasswordEmpty: false
            })
        } else if(!this.state.username){
            this.setState({usernameEmpty: true, passwordEmpty: false})
        } else if(!this.state.password){
            this.setState({passwordEmpty: true, usernameEmpty: false})
        } else if(this.state.username && this.state.password){
            DataManager.getUserLogin(this.state.username, this.state.password).then((user)=>{
                if(user.length !== 0){
                    sessionStorage.setItem("user", JSON.stringify(user))
                    this.props.history.push("/userpage")
                } else {
                    this.setState({noUser: true, usernameEmpty: false, passwordEmpty: false})
                }
            })
        }
    }

    handleRegister = (e) => {
        if(!this.state.registerUsername && !this.state.registerEmail && !this.state.registerPassword){
            loginAnimation(e)
            document.querySelector("#password").value = "";
            document.querySelector("#username").value = "";
            this.setState({
                registerEmail: "", 
                registerUsername: "", 
                registerPassword: "", 
                isRegistered: false,
                username: "",
                password: "",
                noUser: false,
                usernameEmpty: false,
                passwordEmpty: false,
                rUsernameEmpty: false, 
                rEmailEmpty: false, 
                rPasswordEmpty: false
            })
        } else if (!this.state.registerUsername){
            this.setState({rUsernameEmpty: true, rEmailEmpty: false, rPasswordEmpty: false})
        } else if (!this.state.registerEmail){
            this.setState({rEmailEmpty: true, rPasswordEmpty: false, rUsernameEmpty: false})
        } else if (!this.state.registerPassword){
            this.setState({rPasswordEmpty: true, rUsernameEmpty: false, rEmailEmpty: false})
        } else if(this.state.registerUsername && this.state.registerEmail && this.state.registerPassword){
            DataManager.getUserName(this.state.registerUsername)
            .then(user => {
                if(user.length !== 0){
                    this.setState({isRegistered: true, rPasswordEmpty: false, rUsernameEmpty: false, rEmailEmpty: false})
                } else {
                    DataManager.getUserEmail(this.state.registerEmail)
                    .then(user => {
                        if(user.length !== 0){
                            this.setState({isRegistered: true, rPasswordEmpty: false, rUsernameEmpty: false, rEmailEmpty: false})
                        } else {
                            let newUser = {
                                username: this.state.registerUsername,
                                password: this.state.registerPassword,
                                email: this.state.registerEmail,
                                image: "Edit your profile to add an image!",
                                birthday: "Edit your profile to add your birthday"
                            }
                            DataManager.add("users", newUser)
                            .then(() => { 
                                this.setState({
                                    registerSuccess: true, 
                                    rPasswordEmpty: false, 
                                    rUsernameEmpty: false, 
                                    rEmailEmpty: false, 
                                    registerEmail: "", 
                                    registerUsername: "", 
                                    registerPassword: "", 
                                    isRegistered: false
                                })
                            })
                        }
                    })
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
                            <div className="login-header">
                                <img src={PantryLogo} alt="Logo" className="logo" />
                                <h4>Register For Pantry Perfect</h4>
                            </div>
                            {
                                this.state.isRegistered &&
                                <Message error size="mini">This Username or Email address is already registered, please try logging in instead.</Message>
                            }
                            {
                                this.state.rUsernameEmpty &&
                                <div>
                                    <Message error size="mini">Please enter a Username.</Message>
                                    <div className="username">
                                        <Input fluid error label={{icon: "user circle"}} labelPosition="left" type="text" className="input-margin" placeholder="Create a Username" id="registerUsername" defaultValue={this.state.registerUsername} onChange={this.handleFieldChange} />
                                    </div>
                                </div>
                            }
                            {
                                !this.state.rUsernameEmpty &&
                                <div className="username">
                                    <Input fluid label={{icon: "user circle"}} labelPosition="left" type="text" className="input-margin" placeholder="Create a Username" id="registerUsername" defaultValue={this.state.registerUsername} onChange={this.handleFieldChange} />
                                </div>
                            }
                            {
                                this.state.rEmailEmpty &&
                                <div>
                                    <Message error size="mini">Please enter an Email Address.</Message>
                                    <div className="email">
                                        <Input fluid error label={{icon: "at"}} labelPosition="left" type="text" className="input-margin" placeholder="Register Your Email" id="registerEmail" defaultValue={this.state.registerEmail} onChange={this.handleFieldChange} />
                                    </div>
                                </div>
                            }
                            {
                                !this.state.rEmailEmpty &&
                                <div className="email">
                                    <Input fluid type="text" label={{icon: "at"}} labelPosition="left" className="input-margin" placeholder="Register Your Email" id="registerEmail" defaultValue={this.state.registerEmail} onChange={this.handleFieldChange} />
                                </div>
                            }
                            {
                                this.state.rPasswordEmpty &&
                                <div>
                                    <Message error size="mini">Please create a Password!</Message>
                                    <div className="password">
                                        <Input error fluid label={{icon: "hide"}} labelPosition="left" type="password" className="input-margin" placeholder="Create a secure Password" id="registerPassword" defaultValue={this.state.registerPassword} onChange={this.handleFieldChange} />
                                    </div>
                                </div>
                            }
                            {
                                !this.state.rPasswordEmpty &&
                                <div className="password">
                                    <Input fluid label={{icon: "hide"}} labelPosition="left" type="password" className="input-margin" placeholder="Create a secure Password" id="registerPassword" defaultValue={this.state.registerPassword} onChange={this.handleFieldChange} />
                                </div>
                            }
                            {
                                this.state.registerSuccess &&
                                <Message success size="mini">You've successfully registered for Pantry Perfect! Please login!</Message>
                            }
                        </div>
                        <div className="card-footer signup-button">
                            <button type="submit" className="signup-btn" onClick={this.handleRegister}>Sign Up</button>
                        </div>
                    </div>
                    <div className="login-card elevation-2 limit-width sign-up-card above">
                        <div className="card-body">
                            <div className="login-header">
                                <img src={PantryLogo} alt="Logo" className="logo" />
                                <h4>Welcome Back!</h4>
                            </div>
                            {
                                this.state.usernameEmpty &&
                                <div>
                                    <Message error size="mini">Please enter your Username</Message>
                                    <div className="username">
                                        <Input fluid error label={{icon: "user circle"}} labelPosition="left" type="text" className="input-margin" placeholder="Username" id="username" defaultValue={this.state.username} onChange={this.handleFieldChange} />
                                    </div>
                                </div>
                            }
                            {
                                !this.state.usernameEmpty &&
                                <div className="username">
                                    <Input fluid label={{icon: "user circle"}} labelPosition="left" type="text" className="input-margin" placeholder="Username" id="username" defaultValue={this.state.username} onChange={this.handleFieldChange} />
                                </div>
                            }
                            {
                                this.state.passwordEmpty &&
                                <div>
                                    <Message error>Please enter your Password</Message>
                                    <div className="password">
                                        <Input fluid error label={{icon: "hide"}} labelPosition="left" type="password" className="input-margin" placeholder="Password" id="password" defaultValue={this.state.password}onChange={this.handleFieldChange} />
                                    </div>
                                </div>
                            }
                            {
                                !this.state.passwordEmpty &&
                                <div className="password">
                                    <Input fluid label={{icon: "hide"}} labelPosition="left" type="password" className="input-margin" placeholder="Password" id="password" defaultValue={this.state.password} onChange={this.handleFieldChange} />
                                </div>

                            }
                            {
                                this.state.noUser &&
                                <Message error>No Account was found. Please double check that you have entered in the right information.</Message>
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