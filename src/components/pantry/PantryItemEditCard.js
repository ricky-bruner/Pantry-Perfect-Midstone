import React, { Component } from "react";
import QtyConverter from "../../modules/QtyConverter";
import { Card, Button, Message, Input, Popup } from "semantic-ui-react";

export default class PantryItemEditCard extends Component {
    state = {
        itemName: "",
        itemAmount: "",
        itemQuantityType: "",
        convertQuantityType: "",
        renderEdit: false,
        nameTaken: false,
        nameSimilar: false,
        convertQuantity: false
    }

    componentDidMount(){
        let pantryItem = {
            itemName: this.props.pantryItem.name,
            itemAmount: QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name),
            itemQuantityType: this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name,
            convertQuantityType: this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name
        }
        this.setState(pantryItem)
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    renderEdit = () => {
        this.setState({renderEdit: true})
    }

    handleEdit = () => {
        if(this.state.itemName === this.props.pantryItem.name){
            let editedItem = {
                quantity: QtyConverter.convertToTSP(parseInt(this.state.itemAmount, 0), this.state.itemQuantityType),
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id
            }
            this.props.editPantryItem(this.props.pantryItem.id, editedItem)
            .then(() => this.setState({renderEdit: false}))
        } else {
            let editedItem = {
                name: this.state.itemName,
                quantity: QtyConverter.convertToTSP(parseInt(this.state.itemAmount, 0), this.state.itemQuantityType),
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id
            }
            if(this.props.pantryItems.find(item => item.name === editedItem.name)){
                this.setState({nameTaken: true, nameSimilar: false})
            } else if(this.props.pantryItems.find(item => item.name.toLowerCase().includes(editedItem.name.toLowerCase())) || this.props.pantryItems.find(item => editedItem.name.toLowerCase().includes(item.name.toLowerCase()))){
                this.setState({nameSimilar: true, nameTaken: false})
            } else {
                this.props.editPantryItem(this.props.pantryItem.id, editedItem)
                .then(() => this.setState({renderEdit: false, nameTaken: false}))
            }
        }
    }

    convertQuantity = () => {
        let pantryItem = this.props.pantryItem
        pantryItem.quantityTypeId = this.props.quantityTypes.find(type => type.name === this.state.convertQuantityType).id
        this.props.editPantryItem(pantryItem.id, pantryItem)
        .then(() => this.setState({convertQuantity: false}))
    }

    handleDelete = () => {
        this.props.editPantryItem(this.props.pantryItem.id, {visible: false})
    }

    renderQuantityConvert = () => {
        this.setState({convertQuantity: true})
    }
    
    render(){
        return (
            <div className="pantry-item-card">
            {
                !this.state.renderEdit &&
                !this.state.convertQuantity &&
                <Card fluid color="red" className="edit-pantry-item">
                    <div className="pantry-item">
                        <Card.Header className="pantry-item-header-left">{this.props.pantryItem.name}</Card.Header>
                        <Card.Header className="pantry-item-header-right">{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</Card.Header>
                    </div>
                    <div className="edit-footer">
                        <Button.Group>
                            <Button basic compact color="orange" size="mini" onClick={this.renderEdit}>Edit</Button>
                            <Button.Or />
                            <Button basic compact color="red" size="mini" onClick={this.handleDelete}>Delete</Button>
                            <Button.Or />
                            <Button basic compact color="teal" size="mini" onClick={this.renderQuantityConvert}>Convert</Button>
                        </Button.Group>
                    </div>
                </Card>
            }
            {
                this.state.convertQuantity &&
                <Card fluid color='blue' className="edit-pantry-item">
                    <Card.Header className="pantry-item-header-left">{this.props.pantryItem.name}</Card.Header>
                    <div className="pantry-edit-flex">
                        <Card.Header className="edit-item-left">Current: </Card.Header>
                        <p className="edit-item-right">{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name}</p>
                    </div>
                    <div className="pantry-edit-flex">
                        <Card.Header className="edit-item-left">New:</Card.Header>
                        <select id="convertQuantityType" className="edit-item-right" defaultValue={this.state.convertQuantityType} onChange={this.handleFieldChange}>
                        {
                            this.props.quantityTypes.map(type => {
                                if(type.name !== this.state.itemQuantityType){
                                    return <option key={type.id} defaultValue={type.name}>{type.name}</option>  
                                } else {
                                    return <option key={type.id} defaultValue={type.name}>{type.name}</option>
                                }
                            })
                        }   
                        </select>
                    </div>
                    <div className="edit-footer">
                        <Button.Group>
                            <Button compact basic color="red" size="mini" onClick={() => {this.setState({convertQuantity: false})}}>Cancel</Button>
                            <Button.Or />
                            <Button compact basic color="teal" size="mini" onClick={this.convertQuantity}>Convert</Button>
                        </Button.Group>
                    </div>
                </Card>
            }
            {
                this.state.renderEdit &&
                <Card fluid color='teal' className="edit-pantry-item">
                    {
                        this.state.nameTaken &&
                        <div>
                            <Message floating size="mini" color='red' className="align-center">Another item in your panty has this name</Message>
                            <Input error label={{ color: 'red', labelPosition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" size="mini" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />    
                        </div>
                    }
                    {
                        this.state.nameSimilar &&
                        <div>
                            <Message floating size="mini" color='red' className="align-center">Another item in your panty currently or in the past has a similar name to this! Consider using those instead!</Message>
                            <Input error size="mini" label={{ color: 'red', labelPosition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
                        </div>
                    }
                    {
                        !this.state.nameTaken &&
                        !this.state.nameSimilar &&
                        <Popup position="top center" wide className="warning-popup" trigger={<Input label={{ color: 'teal', labelPosition: 'left', content: 'Name'}} type="text" id="itemName" className="input-margin" size="mini" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />} content="WARNING! Changing the name here will change it in every Recipe it is used in! Please only edit a name to fix spelling :D" />
                    }
                    <Input size="mini" label={{ color: 'teal', labelPosition: 'right', content: 'Quantity'}} type="number" id="itemAmount" className="input-margin" defaultValue={this.state.itemAmount} onChange={this.handleFieldChange} />
                    <div>
                        <Input list='languages' fluid id="itemQuantityType" className="input-margin" size="mini" label={{ color: 'teal', labelPosition: 'left', content: 'Quantity Type'}} placeholder={this.state.itemQuantityType} onChange={this.handleFieldChange} />
                        <datalist id='languages'>
                            {
                                this.props.quantityTypes.map(type => {
                                    if(type.name !== this.state.itemQuantityType){
                                        return <option key={type.id} value={type.name}/>  
                                    } else {
                                        return <option key={type.id} value={type.name}/>
                                    }
                                })
                            }
                        </datalist>
                    </div>
                    <div className="edit-footer">
                        <Button.Group>
                            <Button basic compact size="mini" color="red" onClick={() => {this.setState({renderEdit: false})}}>Cancel</Button>
                            <Button.Or />
                            <Button basic compact size="mini" color="teal" onClick={this.handleEdit}>Save Changes</Button>
                        </Button.Group>
                    </div>
                </Card>
            }
            </div>
        )
    }
}