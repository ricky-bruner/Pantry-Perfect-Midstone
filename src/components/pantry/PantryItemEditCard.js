import React, { Component } from "react";
import QtyConverter from "../../modules/QtyConverter";

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
                <div>
                    <p>{this.props.pantryItem.name}</p>
                    <p>{QtyConverter.convertFromTSP(parseInt(this.props.pantryItem.quantity, 0), this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name)} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
                    <button onClick={this.renderEdit}>Edit</button>
                    <button onClick={this.handleDelete}>Delete</button>
                    <button onClick={this.renderQuantityConvert}>Convert to Another Quantity Type</button>
                </div>
            }
            {
                this.state.convertQuantity &&
                <div>
                    <p>{this.props.pantryItem.name}</p>
                    <p>Current: {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
                    <p>New:</p>
                    <select id="convertQuantityType" defaultValue={this.state.convertQuantityType} onChange={this.handleFieldChange}>
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
                    <button onClick={this.convertQuantity}>Convert!</button>
                </div>
            }
            {
                this.state.renderEdit &&
                <div>
                    {
                        this.state.nameTaken &&
                        <div>
                            <span className="error-p">Another item in your panty has this name</span>
                            <input type="text" id="itemName" className="error" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />    
                        </div>
                    }
                    {
                        this.state.nameSimilar &&
                        <div>
                            <span className="error-p">Another item in your panty currently or in the past has a similar name to this! Consider using those instead!</span>
                            <input type="text" id="itemName" className="error" defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
                        </div>
                    }
                    {
                        !this.state.nameTaken &&
                        !this.state.nameSimilar &&
                        <input type="text" id="itemName"  defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
                    }
                    <input type="text" id="itemAmount" defaultValue={this.state.itemAmount} onChange={this.handleFieldChange} />
                    <select id="itemQuantityType" defaultValue={this.state.itemQuantityType} onChange={this.handleFieldChange}>
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
                    <button onClick={this.handleEdit}>Save Changes</button>
                </div>
            }
            </div>
        )
    }
}