import React, { Component } from "react";
import { Message } from "semantic-ui-react";

export default class PurchasedItemCard extends Component {
    state = {
        quantity: "",
        quantityType: "Select Quantity Type",
        saved: false,
        enterQuantity: false
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    renderUpdate = () => {
        this.setState({saved: false})
    }

    saveAmount = () => {
        let item = {
            pantryItemId: this.props.pItem.id,
            quantity: parseInt(this.state.quantity, 0),
            quantityType: this.state.quantityType,
            groceryItemId: this.props.grocery.id
        }
        if(item.quantity <= 0 || this.state.quantityType === "Select Quantity Type"){
            this.setState({enterQuantity: true})
        } else {
            this.props.addItemAmounts(item)
            this.setState({saved: true})
        }
    }
    
    render(){
        return (
            <div>
                <p>{this.props.pItem.name}:</p>
                {
                    this.state.saved &&
                    <div>
                        <p>{this.state.quantity} {this.state.quantityType.toLowerCase()}</p>
                        <button onClick={this.renderUpdate}>Update?</button>
                    </div>
                }
                {
                    !this.state.saved &&
                    <div>
                        {
                            this.state.enterQuantity &&
                            <Message floating size="tiny" color='red' className="align-center">Please enter an amount greater than 0 and a type :D</Message>
                        }
                        <input type="number" id="quantity" placeholder="How much did you buy?" defaultValue={this.state.quantity} onChange={this.handleFieldChange} />
                            <select id="quantityType" onChange={this.handleFieldChange} defaultValue={this.state.quantityType}>
                                <option>Select Quantity Type</option>
                                {
                                    this.props.quantityTypes.map(type => <option key={type.id}>{type.name}</option>)
                                }
                            </select>
                        <button onClick={this.saveAmount}>Save Amount!</button>
                    </div>
                }
            </div>
        )
    }
}