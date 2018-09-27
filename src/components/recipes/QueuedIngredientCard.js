import React, { Component } from "react";
import { Button, Input, Icon, Label, Message } from "semantic-ui-react";

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
                    <Message size="mini" floating className="ingredient-card">
                        <p>{this.props.ingredient.name} {this.props.ingredient.quantity} {this.props.ingredient.quantityType}</p>
                        <div className="button-right">
                            <Button size="mini" basic color="orange" onClick={this.updateQuantity}>Update</Button>
                            <Button color="red" basic size="mini" onClick={this.removeIngredient}>Remove</Button>
                        </div>
                    </Message>
                }
                {
                    this.state.updateQuantity &&
                    <Message size="mini" floating>
                        <p>{this.props.ingredient.name}</p>
                        <div className="input-margin queued-edit">
                            <Input type="number" label={{content: "Amount"}} labelPosition="left" id="newQuantity" placeholder="Number" defaultValue={this.state.newQuantity} onChange={this.handleFieldChange} />
                            <Input list="types" label={{content: "Type"}} labelPosition="left" id="newQuantityType" defaultValue={this.state.newQuantityType} onChange={this.handleFieldChange} />
                                <datalist id="types">
                                {
                                    this.props.quantityTypes.map(type => <option key={`type-${type.id}`} value={type.name} />)
                                }
                                </datalist>
                        </div>
                        <div className="button-center">
                            <Button size="mini" basic color="orange" onClick={this.updateIngredientQuantity}>Save</Button>
                        </div>
                    </Message>

                }
            </div>
        )
    }
}