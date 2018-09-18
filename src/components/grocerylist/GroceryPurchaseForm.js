import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

export default class GroceryPurchaseForm extends Component {
    state = { 
        open: false 
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
                                <div>
                                    <p>{pItem.name}</p>
                                    <input type="text" />
                                </div>
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
