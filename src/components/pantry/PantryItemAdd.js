import React, { Component } from "react";

export default class PantryItemAdd extends Component {
    state = {
        itemName: "",
        itemAmount: "",
        itemQuantityType: "" 
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleItemAdd = () => {
        let newItem = {
            userId: this.props.user.id,
            name: this.state.itemName,
            quantity: this.state.itemAmount,
            quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id
        }
        this.props.addPantryItem(newItem)
        .then(() => {
            document.querySelector("#itemName").value = "";
            document.querySelector("#itemAmount").value = "";
            document.querySelector("#itemQuantityType").value = "Type";
            this.setState({
                itemName: "",
                itemAmount: "",
                itemQuantityType: ""
            })
        })
    }
    
    render(){
        return (
            <div className="pantry-add-form">
                <input type="text" id="itemName" placeholder="Name of Item" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
                <input type="text" id="itemAmount" placeholder="Amount on hand" defaultValue={this.state.itemAmount} onChange={this.handleFieldChange} />
                <select id="itemQuantityType" defaultValue="Type" onChange={this.handleFieldChange}>
                    <option>Type</option>
                    {
                        this.props.quantityTypes.map(type => <option key={type.id}>{type.name}</option>)
                    }   
                </select>
                <button onClick={this.handleItemAdd}>Add Item!</button>
                
            </div>
        )
    }
}