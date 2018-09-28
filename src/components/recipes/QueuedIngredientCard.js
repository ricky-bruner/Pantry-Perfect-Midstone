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
                        <p className="que-title">{this.props.ingredient.name} {this.props.ingredient.quantity} {this.props.ingredient.quantityType}</p>
                        <div className="button-right">
                            <div>
                                <Button size="mini" basic animated color="orange" onClick={this.updateQuantity}>
                                    <Button.Content visible>Update</Button.Content>
                                    <Button.Content hidden><Icon name="exchange" /></Button.Content>
                                </Button>
                            </div>
                            <div>
                                <Button color="red" basic animated size="mini" onClick={this.removeIngredient}>
                                    <Button.Content visible>Remove</Button.Content>
                                    <Button.Content hidden><Icon name="remove circle" /></Button.Content>
                                </Button>
                            </div>
                        </div>
                    </Message>
                }
                {
                    this.state.updateQuantity &&
                    <Message size="mini" floating>
                        <div className="button-right">
                            <Button size="mini" animated basic color="red" onClick={() => this.setState({updateQuantity: false})}>
                                <Button.Content visible>Cancel</Button.Content>
                                <Button.Content hidden><Icon name="ban" /></Button.Content>
                            </Button>
                        </div>
                        <p className="centered que-title">{this.props.ingredient.name}</p>
                        <div className="input-margin queued-edit">
                            <Input type="number" label={{content: "Amount", color: "orange"}} labelPosition="left" id="newQuantity" placeholder="Number" defaultValue={this.state.newQuantity} onChange={this.handleFieldChange} />
                            <Input list="types" label={{content: "Type", color: "orange"}} labelPosition="left" id="newQuantityType" defaultValue={this.state.newQuantityType} onChange={this.handleFieldChange} />
                                <datalist id="types">
                                {
                                    this.props.quantityTypes.map(type => <option key={`type-${type.id}`} value={type.name} />)
                                }
                                </datalist>
                        </div>
                        <div className="button-center">
                            <Button size="mini" basic animated color="orange" onClick={this.updateIngredientQuantity}>
                                <Button.Content visible>Save</Button.Content>
                                <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                            </Button>
                        </div>
                    </Message>

                }
            </div>
        )
    }
}