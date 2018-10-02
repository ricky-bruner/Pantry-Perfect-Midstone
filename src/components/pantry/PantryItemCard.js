import React, { Component } from "react"
import "./pantryItemCard.css"
import QtyConverter from "../../modules/QtyConverter"
import { Message } from "semantic-ui-react";

export default class PantryItemCard extends Component {

    render(){
        let quantity = ""
        if(QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name).toString().includes(".")){
            quantity = QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name).toString().split(".")[1].length
        }
        let rounded = QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name).toFixed(2) + " " + this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()

        let regular = QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name) + " " + this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()

        let title = this.props.pantryItem.name;

        return (
            <div className="pantry-item-card">
                {
                    quantity > 3 &&
                    <Message floating size="large" className="pantry-item pantry-teal-bg">
                            <div className="pantry-item-header-left">{title}</div>
                            <div className="pantry-item-header-right">{rounded}</div>
                    </Message>
                }
                {
                    quantity < 3 &&
                    <Message floating size="large" className="pantry-item pantry-teal-bg">
                            <div className="pantry-item-header-left">{title}</div>
                            <div className="pantry-item-header-right">{regular}</div>
                    </Message>
                }
            </div>
        )
    }
}