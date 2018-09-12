import React, { Component } from "react";

export default class PantryItemAdd extends Component {
    state = {
        itemName: "",
        itemAmount: "",
        itemQuantityType: "",
        similarItem: false,
        duplicateItem: false,
        emptyInput: false
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleItemAdd = () => {
        if(!this.state.itemQuantityType || this.state.itemQuantityType === "Type" || !this.state.itemName || !this.state.itemAmount){
            this.setState({emptyInput: true})
        } else {
            let newItem = {
                userId: this.props.user.id,
                name: this.state.itemName,
                quantity: this.state.itemAmount,
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id,
                visible: true
            }
            if(this.props.pantryItems.find(item => item.name.toLowerCase() === newItem.name.toLowerCase())){
                this.setState({
                    duplicateItem: true,
                    similarItem: false,
                    emptyField: false
                })
            } else if(this.props.pantryItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))){
                this.setState({
                    duplicateItem: false,
                    similarItem: true,
                    emptyField: false
                })
            } else if (this.props.pantryItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase()))){
                this.setState({
                    duplicateItem: false,
                    similarItem: true,
                    emptyField: false
                })
            } else {
                this.props.addPantryItem(newItem)
                .then(() => {
                    document.querySelector("#itemName").value = "";
                    document.querySelector("#itemAmount").value = "";
                    document.querySelector("#itemQuantityType").value = "Type";
                    this.setState({
                        itemName: "",
                        itemAmount: "",
                        itemQuantityType: "",
                        similarItem: false, 
                        duplicateItem: false,
                        emptyField: false
                    })
                })
            }
        }
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
                {
                    this.state.emptyInput &&
                    <p className="error-p">Please Make sure everything is filled out!</p>
                }
                <button onClick={this.handleItemAdd}>Add Item!</button>
                {
                    this.state.similarItem &&
                    <div>
                        <p className="error">You have a similar already in your pantry. Add anyways?</p>
                        <button>Add Similar Item</button>
                    </div>
                }
                {
                    this.state.duplicateItem && 
                    <div>
                        <p>You already have this item in your Pantry. Consider changing what you call it to add a similar item, or update your quantity instead</p>
                        <button>Update Quantity</button>
                    </div>
                }
                
            </div>
        )
    }
}