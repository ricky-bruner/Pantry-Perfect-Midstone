import React, { Component } from "react";

export default class PantryItemEditCard extends Component {
    state = {
        itemName: "",
        itemAmount: "",
        itemQuantityType: "",
        renderEdit: false,
        nameTaken: false,
        nameSimilar: false
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
        if(this.state.itemName === this.props.pantryItem.name){
            let editedItem = {
                quantity: parseInt(this.state.itemAmount, 0),
                quantityTypeId: this.props.quantityTypes.find(type => type.name === this.state.itemQuantityType).id
            }
            this.props.editPantryItem(this.props.pantryItem.id, editedItem)
            .then(() => this.setState({renderEdit: false}))
        } else {
            let editedItem = {
                name: this.state.itemName,
                quantity: parseInt(this.state.itemAmount, 0),
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

    handleDelete = () => {
        this.props.editPantryItem(this.props.pantryItem.id, {visible: false})
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
                    <button onClick={this.handleDelete}>Delete</button>
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