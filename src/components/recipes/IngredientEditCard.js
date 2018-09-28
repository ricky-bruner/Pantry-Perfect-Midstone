import React, { Component } from "react";
import DataManager from "../../modules/DataManager";
import { Message, Button, Icon, Input } from "semantic-ui-react"
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
            <Message size="tiny" floating>
                <div className="pre-edit-header">
                    <div className="ingredient-edit-details">
                        <p className="edit-ingredient-title">{this.props.ingredient.name}</p>
                        {
                            !this.state.editQuantity &&
                            <p className="align-right edit-ingredient-quantity">{this.props.ingredient.quantity} {this.props.ingredient.type.toLowerCase()}</p>
                        }
                    </div>
                    <div className="button-right">
                        {
                            !this.state.editQuantity &&
                            <div>
                                <Button size="mini" basic animated color="orange" onClick={this.editQuantity}>
                                    <Button.Content visible>Edit</Button.Content>
                                    <Button.Content hidden><Icon name="exchange" /></Button.Content>
                                </Button>
                            </div>
                        }
                        {
                            this.state.editQuantity &&
                            <div>
                                <Button size="mini" animated basic color="orange" onClick={this.cancelQuantityEdit}>
                                    <Button.Content visible>Cancel</Button.Content>
                                    <Button.Content hidden><Icon name="ban" /></Button.Content>
                                </Button>
                            </div>
                        }
                        <div>
                            <Button size="mini" basic animated color="red" onClick={this.removeIngredient}>
                                <Button.Content visible>Remove</Button.Content>
                                <Button.Content hidden><Icon name="remove circle" /></Button.Content>
                            </Button>
                        </div>
                    </div>
                </div>
                {
                    this.state.editQuantity &&
                    <div className="post-edit-footer">
                        {
                            this.state.noChanges &&
                            this.state.editQuantity &&
                            <Message error size="mini">You didn't change anything</Message>
                        }
                        <div>
                            <Input type="number" size="mini" label={{content: "Amount", color: "orange"}} labelPosition="left" className="input-margin" id="quantity" defaultValue={this.props.ingredient.quantity} onChange={this.handleFieldChange} />
                            <Input list="types" size="mini" label={{content: "Amount", color: "orange"}} labelPosition="left" className="input-margin" id="quantityType" defaultValue={this.props.ingredient.type} onChange={this.handleFieldChange} />
                                <datalist id="types">
                                    {
                                        this.props.quantityTypes.map(type => <option key={`${this.props.recipeItem.id}-${type.id}`} value={type.name} />)
                                    }
                                </datalist>
                        </div>
                        <div className="button-center">
                            <Button size="mini" color="orange" animated onClick={this.updateQuantity}>
                                <Button.Content visible>Save</Button.Content>
                                <Button.Content hidden><Icon name="checkmark"/></Button.Content>
                            </Button>
                        </div>
                    </div>
                }
            </Message>
        )
    }
}