import { Component } from "react";
import React from "react";
import Login from "./components/login/Login";
import { Route } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";


export default class App extends Component {
    isAuthenticated = () => sessionStorage.getItem("user") !== null
    
    render() {
        return (
            <React.Fragment>
                {
                    !this.isAuthenticated() &&
                    <Route exact path="/login" render={(props) => {
                        return <Login {...props} />
                    }} />
                }
                {
                    <ApplicationViews isAuthenticated={this.isAuthenticated}/>
                }
            </React.Fragment>
        )
    }
} 
