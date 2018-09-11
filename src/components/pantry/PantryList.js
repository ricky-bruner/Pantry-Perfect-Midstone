import React, { Component } from "react";
import PantryItemCard from "./PantryItemCard";

export default class PantryList extends Component {
    state = {
        pantryItems: [],
        quantityTypes: []
    }
    
    componentDidMount(){
        console.log("CDM", this.props);
        this.setState({
            pantryItems: this.props.pantryItems,
            quantityTypes: this.props.quantityTypes
        })
    }

    render(){
        console.log("render", this.props)
        return (
            <div className="pantry-list-container">
                {
                    this.props.pantryItems.map(item => {
                        return <PantryItemCard key={item.id} pantryItem={item} quantityTypes={this.props.quantityTypes} />
                    })
                }
            </div>
        )
    }
}