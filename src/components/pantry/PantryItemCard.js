import React, { Component } from "react"
import "./pantryItemCard.css"
import QtyConverter from "../../modules/QtyConverter"

export default class PantryItemCard extends Component {
    render(){
        return (
            <div className="pantry-item-card">
                <p>{this.props.pantryItem.name}</p>
                <p>{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
            </div>
        )
    }
}