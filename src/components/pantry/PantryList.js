import React, { Component } from "react";
import PantryItemCard from "./PantryItemCard";
import PantryItemAdd from "./PantryItemAdd";

export default class PantryList extends Component {
    // state = {
    //     pantryItems: [],
    //     quantityTypes: []
    // }
    
    // componentDidMount(){
    //     console.log("CDM", this.props);
    //     this.setState({
    //         pantryItems: this.props.pantryItems,
    //         quantityTypes: this.props.quantityTypes
    //     })
    // }

    render(){
        console.log("render", this.props)
        return (
            <div className="pantry-list-container">
                <h2>Pantry Items</h2>
                <PantryItemAdd user={this.props.user}   
                                addPantryItem={this.props.addPantryItem} 
                                pantryItems={this.props.pantryItems} 
                                quantityTypes={this.props.quantityTypes} />
                {
                    this.props.pantryItems.map(item => {
                        return <PantryItemCard key={item.id} pantryItem={item} quantityTypes={this.props.quantityTypes} />
                    })
                }
            </div>
        )
    }
}