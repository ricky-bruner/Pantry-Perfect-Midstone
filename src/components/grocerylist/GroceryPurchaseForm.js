import React, { Component } from 'react';
import { Button, Header, Modal, Message, Icon, Divider } from 'semantic-ui-react';
import PurchasedItemCard from './PurchaseItemCard';
import QtyConverter from "../../modules/QtyConverter";
import DataManager from "../../modules/DataManager";
import "./groceryPurchaseForm.css";

export default class GroceryPurchaseForm extends Component {
    state = { 
        open: false,
        noChanges: false,
        newAmounts: []
    }

    addItemAmounts = (item) => {
        let newAmounts = this.state.newAmounts;
        if(newAmounts.find(u => u.groceryItemId === item.goceryItemId)){
            newAmounts = newAmounts.filter(u => u.groceryItemId !== item.groceryItemId)
            newAmounts.push(item)
            this.setState({newAmounts: newAmounts})
        } else {
            newAmounts.push(item)
            this.setState({newAmounts: newAmounts})
        }
    }

    updatePantry = () => {
        if(this.state.newAmounts.length === 0){
            this.setState({noChanges: true})
        } else {
            Promise.all(this.state.newAmounts.map(item => {
                let pItem = this.props.pantryItems.find(pItem => pItem.id === item.pantryItemId);
                let quantity = QtyConverter.convertToTSP(item.quantity, item.quantityType) + pItem.quantity;
                return DataManager.edit("pantryItems", item.pantryItemId, {quantity: quantity})
                .then(() => DataManager.delete("groceryItems", item.groceryItemId))
                .then(() => this.props.clearGrocery(item))
            }))
            .then(() => this.props.updatePantryItemState())
            .then(() => this.props.updateGroceryItemState())
            .then(() => this.setState({ open: false, noChanges: false, newAmounts: []}))
        }
    }
    
    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false, noChanges: false, newAmounts: [] })
    
    render() {
        const { open, dimmer } = this.state
        
        return (
            <div>
                {
                    this.props.boughtGroceries.length === 0 &&
                    <Button positive icon='checkmark' labelPosition='right' content="Update Grocery List!" disabled onClick={this.show('blurring')} />
                }
                {
                    this.props.boughtGroceries.length > 0 &&
                    <Button positive icon='checkmark' labelPosition='right' content="Update Grocery List!" onClick={this.show('blurring')} />
                }
                <Modal dimmer={dimmer} size="tiny" open={open} onClose={this.close}>
                    <Modal.Actions className="cancel-red-bg">
                        <div className="button-right">
                            <Button color='red' animated size="mini" onClick={this.close}>
                                <Button.Content visible>Cancel</Button.Content>
                                <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                            </Button>
                        </div>
                    </Modal.Actions>
                    <Modal.Header className="centered">Lets set the Pantry</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                        <Header className="centered">Purchased Items:</Header>
                        <Divider />
                        {
                            this.props.boughtGroceries.map(grocery => {
                                let pItem = this.props.pantryItems.find(p => p.id === grocery.pantryItemId)
                                return (
                                    <PurchasedItemCard key={`${grocery.id}-${pItem.id}`} pItem={pItem} grocery={grocery} quantityTypes={this.props.quantityTypes} pantryItems={this.props.pantryItems} addItemAmounts={this.addItemAmounts}/>
                                )
                            })
                        }
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions className="purchase-grocery-footer">
                        {
                            this.state.noChanges &&
                            <Message floating size="tiny" color='red' className="align-center">You didn't select anything to update!</Message>
                        }
                        <div className="button-center">
                            <Button color="green" icon='calculator' size="tiny" labelPosition='right' content="Update Pantry!" onClick={this.updatePantry} />
                        </div>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
