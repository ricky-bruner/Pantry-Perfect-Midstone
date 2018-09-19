import React, { Component } from "react"
import "./pantryItemCard.css"
import QtyConverter from "../../modules/QtyConverter"

export default class PantryItemCard extends Component {

    render(){
        let quantity = ""
        if(QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name).toString().includes(".")){
            quantity = QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name).toString().split(".")[1].length
        }
        return (
            <div className="pantry-item-card">
                <p>{this.props.pantryItem.name}</p>
                {
                    quantity > 3 &&
                    <p>{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name).toFixed(2)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
                }
                {
                    quantity < 3 &&
                    <p>{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
                }
            </div>
        )
    }
}