import React, { Component } from "react";
import QtyConverter from "../../modules/QtyConverter";
import { Input, Button, Message, Icon, Divider } from "semantic-ui-react";

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
        similarItemName: "",
        revivedItemName: ""
    }

    resetState = () => {
        document.querySelector("#itemName").value = "";
        document.querySelector("#itemAmount").value = "";
        document.querySelector("#itemQuantityType").value = "";
        this.setState({
            itemName: "",
            itemAmount: "",
            itemQuantityType: "",
            similarItem: false,
            duplicateItem: false,
            emptyInput: false,
            similarRetired: false,
            reviveItem: false,
            similarItemName: "",
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
                timesTrashed: 0,
                visible: true
            }
            let currentItems = this.props.pantryItems.filter(item => item.visible);
            let retiredItems = this.props.pantryItems.filter(item => !item.visible);
            if(currentItems.find(item => item.name.toLowerCase() === newItem.name.toLowerCase())){
                this.setState({
                    duplicateItem: true,
                    similarItem: false,
                    emptyInput: false,
                    similarRetired: false,
                    reviveItem: false
                })
            } else if(currentItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))){
                let similarItem = currentItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase())) || 
                currentItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))
                this.setState({
                    duplicateItem: false,
                    similarItem: true,
                    emptyInput: false,
                    similarRetired: false,
                    reviveItem: false, 
                    similarItemName: similarItem.name
                })
            } else if (currentItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase()))){
                let similarItem = currentItems.find(item => item.name.toLowerCase().includes(newItem.name.toLowerCase())) || 
                currentItems.find(item => newItem.name.toLowerCase().includes(item.name.toLowerCase()))
                this.setState({
                    duplicateItem: false,
                    similarItem: true,
                    emptyInput: false,
                    similarRetired: false,
                    reviveItem: false,
                    similarItemName: similarItem.name
                })
            } else if(retiredItems.find(item => item.name.toLowerCase() === newItem.name.toLowerCase())){
                this.setState({
                    reviveItem: true,
                    duplicateItem: false,
                    similarItem: false,
                    emptyInput: false,
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
            timesTrashed: 0,
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
                <h3 className="centered">Add a New Pantry Item</h3>
                <Input size="mini" label={{ color: 'teal', content: 'Name:'}} labelPosition='left' type="text" id="itemName" className="input-margin" placeholder="Name of Item" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
                <Input size="mini" label={{ color: 'teal', content: 'Quantity:'}} labelPosition='left' type="text" id="itemAmount" className="input-margin" placeholder="Amount on hand" defaultValue={this.state.itemAmount} onChange={this.handleFieldChange} />
                <div>
                    <Input list='types' fluid id="itemQuantityType" className="input-margin" size="mini" label={{ color: 'teal', content: 'Quantity Type:'}} labelPosition='left' placeholder="Type" onChange={this.handleFieldChange} />
                    <datalist id='types'>
                        {
                            this.props.quantityTypes.map(type => <option key={type.id} value={type.name} />)
                        }
                    </datalist>
                </div>
                {
                    this.state.emptyInput &&
                    <Message icon="arrow up" size="tiny" color="orange" header="Oops! It seems that something isn't filled out just yet." content="No worries, We'll be ready when you are" />
                }
                <div className="button-center">
                    <Button basic animated size="mini" color="blue" onClick={this.handleItemAdd}>
                        <Button.Content visible>Add</Button.Content>
                        <Button.Content hidden><Icon name="add" /></Button.Content>
                    </Button>
                </div>
                {
                    this.state.similarItem &&
                    <div>
                        <Divider horizontal>alert</Divider>
                        <Message size="tiny" color="teal" header={this.state.similarItemName} content="is already in your pantry. Add this similar item anyways?" />
                        <div className="button-center">
                            <Button basic size="mini" color="green" onClick={this.handleSimilarAdd}>Add Similar Item</Button>
                        </div>
                    </div>
                }
                {
                    this.state.duplicateItem && 
                    <div>
                        <Divider horizontal>alert</Divider>
                        <Message size="tiny" color="red" content="You already have this item in your Pantry. Consider changing what you call it to add a similar item, or update your quantity instead" />
                        <div className="button-center">
                            <Button basic size="mini" color="green" onClick={this.handleDuplicateAdd}>Update Quantity</Button>
                        </div>
                    </div>
                }
                {
                    this.state.similarRetired &&
                    <div>
                        <Divider horizontal>alert</Divider>
                        <Message size="tiny" color="teal" header={`Similar Item: ${this.state.revivedItemName}`} content="This item is very similar to an item that used to live in your pantry! Would you like to add that item back, or go forth with this new item?" />
                        <div className="button-center">
                            <Button basic size="mini" color="teal" onClick={this.reviveItem}>Revive the item!</Button>
                            <Button basic size="mini" color="green" onClick={this.handleSimilarAdd}>Save Anyways</Button>
                        </div>
                    </div>
                }
                {
                    this.state.reviveItem &&
                    <div>
                        <Divider horizontal>alert</Divider>
                        <Message size="tiny" color="teal" header={`Revive Item: ${this.state.revivedItemName}`} content="This item used to live in your pantry. Bring that item back from the grave?" />
                        <div className="button-center">
                            <Button basic size="mini" color="teal" onClick={this.reviveItem}>Be a hero!</Button>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
}