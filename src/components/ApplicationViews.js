import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import UserPage from "./UserPage";




export default class ApplicationViews extends Component {

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated() &&
                    <div className="viewArea">
                        <Route exact path="/userpage" render={(props) => {
                                return <UserPage {...props} />
                            }} />
                    </div>
                }
                {
                    !this.props.isAuthenticated() &&
                    <Redirect to="/login" />
                }
            </React.Fragment>
        )
    }
}