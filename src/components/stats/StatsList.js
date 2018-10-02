import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import CookChart from "./CookChart";
import SpoilChart from "./SpoilChart";
import Tilt from "react-tilt";
import "./statsList.css"

export default class StatsList extends Component {
    render(){
        return (
            <div className="stats-list">
                <h2 className="centered logo-font">Hello, {this.props.user.username}</h2>
                <h4 className="centered">Here are some basic details about how you cook!</h4>
                <Divider horizontal>Meals</Divider>
                <Tilt className="Tilt" options={{ max : 20 }} style={{ height: 270, width: 425}} >
                    <CookChart className="Tilt-inner" recipes={this.props.recipes} />
                </Tilt>
                <Divider horizontal>Pantry Ingredients</Divider>
                <Tilt className="Tilt" options={{ max : 20 }} style={{ height: 270, width: 425}} >
                    <SpoilChart className="Tilt-inner" pantryItems={this.props.pantryItems} />
                </Tilt>
            </div>
        )
    }
}