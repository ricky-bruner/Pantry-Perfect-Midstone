import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import PurchasedItemCard from './PurchaseItemCard';

export default class GroceryPurchaseForm extends Component {
    state = { 
        open: false,
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

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open, dimmer } = this.state

        return (
            <div>
                <Button positive icon='checkmark' labelPosition='right' content="Update Grocery List!" onClick={this.show('blurring')} />
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>Lets set the Pantry</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Header>Purchased Items:</Header>
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
                <Modal.Actions>
                    <Button color='black' onClick={this.close}>Nope</Button>
                    <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.close} />
                </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
