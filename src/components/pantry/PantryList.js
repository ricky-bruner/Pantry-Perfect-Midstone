import React, { Component } from "react";
import PantryItemCard from "./PantryItemCard";
import PantryItemAdd from "./PantryItemAdd";
import PantryItemEditCard from "./PantryItemEditCard";
import { Button, Input, Divider, Icon } from "semantic-ui-react";

export default class PantryList extends Component {
    state = {
        edit: false,
        addPantry: false,
        search: ""
    }

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)})
    }

    renderEditCards = () => {
        this.setState({edit: true})
    }

    renderCards = () => {
        this.setState({edit: false})
    }

    renderAddFrom = () => {
        this.setState({addPantry: true})
    }

    hideAddForm = () => {
        this.setState({addPantry: false})
    }

    render(){
        let pantryItems = [];
        if(this.state.search.length > 1){
            pantryItems = this.props.pantryItems.filter(pItem => {
                return pItem.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            })
        }
        return (
            <div className="pantry-list-container">
                <div className="button-right">
                    {
                        !this.state.addPantry &&
                        <Button size="mini" basic animated color="teal" onClick={this.renderAddFrom}>
                            <Button.Content visible>Add</Button.Content>
                            <Button.Content hidden><Icon name="plus" /><Icon name="lemon" /></Button.Content>
                        </Button>
                    }
                    {
                        this.state.addPantry &&
                        <Button size="mini" animated basic color="teal" onClick={this.hideAddForm}>
                            <Button.Content visible>Finish</Button.Content>
                            <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                        </Button>
                    }
                    {
                        !this.state.edit &&
                        <Button size="mini" animated basic color="teal" onClick={this.renderEditCards}>
                            <Button.Content visible>Edit</Button.Content>
                            <Button.Content hidden><Icon name="sync" /></Button.Content>
                        </Button>
                    }
                    {
                        this.state.edit &&
                        <Button size="mini" animated basic color="orange" onClick={this.renderCards}>
                            <Button.Content visible>Finish</Button.Content>
                            <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                        </Button>
                    }
                </div>
                <h2 className="centered">Pantry Items</h2>
                {
                    this.state.addPantry &&
                    <div>
                        <PantryItemAdd user={this.props.user}  
                                        editPantryItem={this.props.editPantryItem} 
                                        addPantryItem={this.props.addPantryItem} 
                                        pantryItems={this.props.pantryItems} 
                                        quantityTypes={this.props.quantityTypes} />
                    </div>
                }
                <div>
                    <Input fluid icon="search" iconPosition="left" size="large" className="input-margin" onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" placeholder="Search for a Pantry Item"></Input>
                </div>
                <div>
                    {
                        !this.state.edit &&
                        pantryItems.filter(p => p.visible).map(item => <PantryItemCard key={item.id} pantryItem={item} quantityTypes={this.props.quantityTypes} />)
                    }
                    {
                        this.state.edit &&
                        pantryItems.filter(p => p.visible).map(item => <PantryItemEditCard key={item.id} 
                                                                                pantryItem={item} 
                                                                                editPantryItem={this.props.editPantryItem}
                                                                                quantityTypes={this.props.quantityTypes} 
                                                                                pantryItems={this.props.pantryItems} 
                                                                                user={this.props.user} />)
                    }
                </div>
                <Divider horizontal>or</Divider>
                {
                    !this.state.edit &&
                    this.props.pantryItems.filter(p => p.visible).map(item => {
                        let similar = pantryItems.find(pI => pI.id === item.id)
                        if(!similar){
                            return <PantryItemCard key={item.id} pantryItem={item} quantityTypes={this.props.quantityTypes} />
                        } else {
                            return null
                        }
                    })
                }
                {
                    this.state.edit &&
                    this.props.pantryItems.filter(p => p.visible).map(item => {
                        let similar = pantryItems.find(pI => pI.id === item.id)
                        if(!similar){
                            return <PantryItemEditCard key={item.id} 
                                                pantryItem={item} 
                                                editPantryItem={this.props.editPantryItem}
                                                quantityTypes={this.props.quantityTypes} 
                                                pantryItems={this.props.pantryItems} 
                                                user={this.props.user} />
                        } else {
                            return null
                        }
                    })
                }
            </div>
        )
    }
}