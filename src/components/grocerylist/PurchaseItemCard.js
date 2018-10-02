import React, { Component } from "react";
import { Message, Input, Button, Icon, Divider } from "semantic-ui-react";

export default class PurchasedItemCard extends Component {
    state = {
        quantity: "",
        quantityType: "Select Quantity Type",
        saved: false,
        enterQuantity: false
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    renderUpdate = () => {
        this.setState({saved: false})
    }

    saveAmount = () => {
        let item = {
            pantryItemId: this.props.pItem.id,
            quantity: parseInt(this.state.quantity, 0),
            quantityType: this.state.quantityType,
            groceryItemId: this.props.grocery.id
        }
        if(item.quantity <= 0 || this.state.quantityType === "Select Quantity Type"){
            this.setState({enterQuantity: true})
        } else {
            this.props.addItemAmounts(item)
            this.setState({saved: true})
        }
    }
    
    render(){
        return (
            <div>
                
                {
                    this.state.saved &&
                    <div className="grocery-buy-resolved">
                        <p className="buy-title">{this.props.pItem.name}</p>
                        <p className="buy-title">{this.state.quantity} {this.state.quantityType}</p>
                        <div className="button-right">
                            <div>
                                <Button basic color="orange" size="mini" animated onClick={this.renderUpdate}>
                                    <Button.Content visible>Update</Button.Content>
                                    <Button.Content hidden><Icon name="exchange" /></Button.Content>
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                {
                    !this.state.saved &&
                    <div>
                        {
                            this.state.enterQuantity &&
                            <Message floating size="mini" color='red' className="align-center">Please fill out all of the fields</Message>
                        }
                        <div className="grocery-buy">
                            <p className="buy-title">{this.props.pItem.name}:</p>
                            <div className="buy-inputs">
                                <div>
                                    <Input size="mini" type="number" id="quantity" placeholder="How much?" defaultValue={this.state.quantity} onChange={this.handleFieldChange} />
                                </div>
                                <div>
                                    <Input list="types" size="mini" id="quantityType" onChange={this.handleFieldChange} placeholder="Select a Type" />
                                        <datalist id="types">
                                        {
                                            this.props.quantityTypes.map(type => <option key={type.id} value={type.name} />)
                                        }
                                        </datalist>
                                </div>
                            </div>
                            <div className="button-right">
                                <div>
                                    <Button size="mini" color="teal" basic animated onClick={this.saveAmount}>
                                        <Button.Content visible>Save</Button.Content>
                                        <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Divider />
            </div>
        )
    }
}