import React, { Component } from "react";

export default class PantryItemEditCard extends Component {
    state = {
        itemName: "",
        itemAmount: "",
        itemQuantityType: "",
        renderEdit: false
    }

    componentDidMount(){
        let pantryItem = {
            itemName: this.props.pantryItem.name,
            itemAmount: this.props.pantryItem.quantity,
            itemQuantityType: this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name
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
        let editedItem = {
            name: this.state.itemName,
            quantity: parseInt(this.state.itemAmount),
            quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id
        }
        this.props.editPantryItem(this.props.pantryItem.id, editedItem)
        .then(() => this.setState({renderEdit: false}))
    }
    
    render(){
        return (
            <div className="pantry-item-card">
            {
                !this.state.renderEdit &&
                <div>
                    <p>{this.props.pantryItem.name}</p>
                    <p>{this.props.pantryItem.quantity} {this.props.quantityTypes.find(type => type.id === this.props.pantryItem.quantityTypeId).name.toLowerCase()}</p>
                    <button onClick={this.renderEdit}>Edit</button>
                    <button>Delete</button>
                </div>
            }
            {
                this.state.renderEdit &&
                <div>
                    <input type="text" id="itemName"  defaultValue={this.state.itemName} onChange={this.handleFieldChange} />
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