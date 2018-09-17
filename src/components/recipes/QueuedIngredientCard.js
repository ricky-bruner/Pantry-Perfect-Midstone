import React, { Component } from "react";

export default class QueuedIngredientCard extends Component {
    state = {
        newQuantity: "",
        newQuantityType: "",
        updateQuantity: false
    }
    
    componentDidMount(){
        this.setState({
            newQuantity: this.props.ingredient.quantity,
            newQuantityType: this.props.ingredient.quantityType
        })
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateQuantity = () => {
        this.setState({updateQuantity: true})
    }
    
    updateIngredientQuantity = () => {
        let ingredient = this.props.ingredient
        ingredient.quantity = parseInt(this.state.newQuantity, 0);
        ingredient.quantityType = this.state.newQuantityType;
        ingredient.quantityTypeId = this.props.quantityTypes.find(type => type.name === this.state.newQuantityType).id
        this.props.updateQueuedQuantity(ingredient)
        this.setState({updateQuantity: false})
    }

    removeIngredient = () => {
        this.props.removeQueuedIngredient(this.props.ingredient)
    }

    render(){
        return (
            <div>
                {
                    !this.state.updateQuantity &&
                    <div>
                        <p>{this.props.ingredient.name} {this.props.ingredient.quantity} {this.props.ingredient.quantityType}</p>
                        <button onClick={this.updateQuantity}>Update Quantity</button>
                    </div>
                }
                {
                    this.state.updateQuantity &&
                    <div>
                        <input type="number" id="newQuantity" placeholder="literally a number goes here" defaultValue={this.state.newQuantity} onChange={this.handleFieldChange} />
                        <select id="newQuantityType" defaultValue={this.state.newQuantityType} onChange={this.handleFieldChange}>
                            <option>Quantity Type</option>
                            {
                                this.props.quantityTypes.map(type => <option key={`type-${type.id}`}>{type.name}</option>)
                            }
                        </select>
                        <button onClick={this.updateIngredientQuantity}>Save Changes</button>
                    </div>

                }
                <button onClick={this.removeIngredient}>Remove from Queue</button>
            </div>
        )
    }
}