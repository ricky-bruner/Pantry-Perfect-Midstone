import React, { Component } from "react"
import "./pantryItemCard.css"
import QtyConverter from "../../modules/QtyConverter"
import { Card } from "semantic-ui-react";

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
            <div>
                {
                    quantity > 3 &&
                    <Card fluid color='teal' className="pantry-item">
                            <Card.Header className="pantry-item-header-left">{title}</Card.Header>
                            <Card.Header className="pantry-item-header-right">{rounded}</Card.Header>
                    </Card>
                }
                {
                    quantity < 3 &&
                    <Card fluid color='teal' className="pantry-item">
                            <Card.Header className="pantry-item-header-left">{title}</Card.Header>
                            <Card.Header className="pantry-item-header-right">{regular}</Card.Header>
                    </Card>
                }
            </div>
        )
    }
}