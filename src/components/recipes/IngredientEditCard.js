import React, { Component } from "react";
import DataManager from "../../modules/DataManager";

export default class IngredientEditCard extends Component {
    state = {
        editQuantity: false,
        quantity: "",
        quantityType: "",
        noChanges: false
    }

    componentDidMount(){
        this.setState({
            quantity: this.props.ingredient.quantity,
            quantityType: this.props.ingredient.type
        })
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    editQuantity = () => {
        this.setState({editQuantity: true})
    }

    cancelQuantityEdit = () => {
        this.setState({editQuantity: false})
    }

    updateQuantity = () => {
        let newQuantity = {
            quantity: parseInt(this.state.quantity, 0),
            quantityTypeId: this.props.quantityTypes.find(qt => qt.name === this.state.quantityType).id
        }
        if(parseInt(this.state.quantity, 0) === parseInt(this.props.ingredient.quantity, 0) && this.state.quantityType === this.props.ingredient.type){
            this.setState({noChanges: true})
        } else {
            DataManager.edit("recipePantryItems", this.props.recipeItem.id, newQuantity)
            .then(() => this.props.updateRecipeItemState())
            .then(() => this.setState({editQuantity: false}))
        }
    }

    removeIngredient = () => {
        DataManager.delete("recipePantryItems", this.props.recipeItem.id)
        .then(() => this.props.updateRecipeItemState())
    }

    render(){
        return (
            <div className="ingredient-card">
                <div>
                    <div>
                        <p>{this.props.ingredient.name}</p>
                    </div>
                    {
                        this.state.editQuantity &&
                        <div>
                            {
                                this.state.noChanges &&
                                <div>
                                    <span className="error-p">You didn't change anything</span>
                                </div>
                            }
                            <input type="number" id="quantity" defaultValue={this.props.ingredient.quantity} onChange={this.handleFieldChange} />
                            <select id="quantityType" defaultValue={this.props.ingredient.type} onChange={this.handleFieldChange}>
                                {
                                    this.props.quantityTypes.map(type => <option key={`${this.props.recipeItem.id}-${type.id}`}>{type.name}</option>)
                                }
                            </select>
                            <button onClick={this.updateQuantity}>Save Changes</button>
                        </div>
                    }
                    {
                        !this.state.editQuantity &&
                        <div>
                            <p>{this.props.ingredient.quantity} {this.props.ingredient.type.toLowerCase()}</p>
                        </div>
                    }
                </div>
                <div>
                    {
                        !this.state.editQuantity &&
                        <button onClick={this.editQuantity}>Edit Quantity</button>
                    }
                    {
                        this.state.editQuantity &&
                        <button onClick={this.cancelQuantityEdit}>Cancel</button>
                    }
                    <button onClick={this.removeIngredient}>Remove</button>
                </div>
            </div>
        )
    }
}