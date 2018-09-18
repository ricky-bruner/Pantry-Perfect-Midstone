import React, { Component } from "react";

export default class PurchasedItemCard extends Component {
    state = {
        quantity: "",
        quantityType: "Select Quantity Type",
        saved: false
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
        this.props.addItemAmounts(item)
        this.setState({saved: true})
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
                        <input type="text" id="quantity" placeholder="How much did you buy?" defaultValue={this.state.quantity} onChange={this.handleFieldChange} />
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