import React, { Component } from "react";

export default class IngredientEditCard extends Component {
    state = {
        editQuantity: false,
        quantity: "",
        quantityType: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    editQuantity = () => {
        this.setState({editQuantity: true})
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
                            <input type="number" id="quantity" defaultValue={this.props.ingredient.quantity} />
                            <select id="quantityType" defaultValue={this.props.ingredient.type}>
                                <option>type</option>
                                <option>{this.props.ingredient.type}</option>
                            </select>
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
                    <button onClick={this.editQuantity}>Edit Quantity</button>
                    <button>Remove</button>
                </div>
            </div>
        )
    }
}