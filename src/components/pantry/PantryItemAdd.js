import React, { Component } from "react";
import QtyConverter from "../../modules/QtyConverter";

export default class PantryItemAdd extends Component {
    state = {
        itemName: "",
        itemAmount: "",
        itemQuantityType: "",
        similarItem: false,
        duplicateItem: false,
        emptyInput: false,
        similarRetired: false,
        reviveItem: false,
        revivedItemName: ""
    }

    resetState = () => {
        document.querySelector("#itemName").value = "";
        document.querySelector("#itemAmount").value = "";
        document.querySelector("#itemQuantityType").value = "Type";
        this.setState({
            itemName: "",
            itemAmount: "",
            itemQuantityType: "",
            similarItem: false,
            duplicateItem: false,
            emptyInput: false,
            similarRetired: false,
            reviveItem: false,
            revivedItemName: ""
        })
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
                quantity: QtyConverter.convertToTSP(parseInt(this.state.itemAmount, 0), this.state.itemQuantityType),
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id,
                visible: true
            }
            let currentItems = this.props.pantryItems.filter(item => item.visible);
            let retiredItems = this.props.pantryItems.filter(item => !item.visible);
            if(currentItems.find(item => item.name.toLowerCase() === newItem.name.toLowerCase())){
                this.setState({
                    duplicateItem: true,
                    similarItem: false,
                    emptyField: false,
                    similarRetired: false,
                    reviveItem: false
                })
            } else if(currentItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))){
                this.setState({
                    duplicateItem: false,
                    similarItem: true,
                    emptyField: false,
                    similarRetired: false,
                    reviveItem: false
                })
            } else if (currentItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase()))){
                this.setState({
                    duplicateItem: false,
                    similarItem: true,
                    emptyField: false,
                    similarRetired: false,
                    reviveItem: false
                })
            } else if(retiredItems.find(item => item.name.toLowerCase() === newItem.name.toLowerCase())){
                this.setState({
                    reviveItem: true,
                    duplicateItem: false,
                    similarItem: false,
                    emptyField: false,
                    similarRetired: false,
                    revivedItemName: this.state.itemName
                })
            } else if(retiredItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase())) || 
                        retiredItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))){
                let similarRevivedItem = retiredItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase())) || 
                retiredItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))
                this.setState({
                    similarRetired: true, 
                    revivedItemName: similarRevivedItem.name
                })
            } else {
                this.props.addPantryItem(newItem)
                .then(() => this.resetState())
            }
        }
    }

    reviveItem = () => {
        let revivedItem = this.props.pantryItems.find(item => item.name.toLowerCase() === this.state.revivedItemName.toLowerCase())
        revivedItem.visible = true;
        revivedItem.quantity = QtyConverter.convertToTSP(parseInt(this.state.itemAmount, 0), this.state.itemQuantityType);
        revivedItem.quantityTypeId = this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id;
        this.props.editPantryItem(revivedItem.id, revivedItem)
        .then(() => this.resetState())
    }

    handleSimilarAdd = () => {
        let similarItem = {
            userId: this.props.user.id,
            name: this.state.itemName,
            quantity: QtyConverter.convertToTSP(parseInt(this.state.itemAmount, 0), this.state.itemQuantityType),
            quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id,
            visible: true
        }
        if(this.props.pantryItems.filter(item => item.visible === false).find(item => item.name.toLowerCase() === similarItem.name.toLowerCase())){
            this.setState({reviveItem: true, similarItem: false, revivedItemName: this.state.itemName})
        } else {
            this.props.addPantryItem(similarItem)
            .then(() => this.resetState())
        }
    }

    handleDuplicateAdd = () => {
        let duplicateItem = this.props.pantryItems.find(item => item.name.toLowerCase() === this.state.itemName.toLowerCase())
        duplicateItem.quantity = QtyConverter.convertToTSP(parseInt(this.state.itemAmount, 0), this.state.itemQuantityType);
        duplicateItem.quantityTypeId = this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id
        this.props.editPantryItem(duplicateItem.id, duplicateItem)
        .then(() => this.resetState())
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
                        <button onClick={this.handleSimilarAdd}>Add Similar Item</button>
                    </div>
                }
                {
                    this.state.duplicateItem && 
                    <div>
                        <p>You already have this item in your Pantry. Consider changing what you call it to add a similar item, or update your quantity instead</p>
                        <button onClick={this.handleDuplicateAdd}>Update Quantity</button>
                    </div>
                }
                {
                    this.state.similarRetired &&
                    <div>
                        <p>This item is very similar to an item that used to live in your pantry! Would you like to add that item back, or go forth with this new item?</p>
                        <p>Similar Item: {this.state.revivedItemName}</p>
                        <button onClick={this.reviveItem}>Revive the item!</button>
                        <button>Save Anyways</button>
                    </div>
                }
                {
                    this.state.reviveItem &&
                    <div>
                        <p>This item used to live in your pantry. Bring that item back from the grave?</p>
                        <p>Item: {this.state.revivedItemName}</p>
                        <button onClick={this.reviveItem}>Be a hero!</button>
                    </div>
                }
                
            </div>
        )
    }
}