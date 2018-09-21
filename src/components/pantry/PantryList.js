import React, { Component } from "react";
import PantryItemCard from "./PantryItemCard";
import PantryItemAdd from "./PantryItemAdd";
import PantryItemEditCard from "./PantryItemEditCard";
import { Button } from "semantic-ui-react";

export default class PantryList extends Component {
    state = {
        edit: false,
        addPantry: false
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
        return (
            <div className="pantry-list-container">
                <h2>Pantry Items</h2>
                {
                    !this.state.edit &&
                    <Button compact size="mini" basic color="teal" onClick={this.renderEditCards}>Edit Pantry?</Button>
                }
                {
                    this.state.edit &&
                    <Button compact size="mini" basic color="blue" onClick={this.renderCards}>Finished Editing</Button>
                }
                {
                    !this.state.addPantry &&
                    <Button compact size="mini" basic color="orange" onClick={this.renderAddFrom}>Add a New Item?</Button>
                }
                {
                    this.state.addPantry &&
                    <Button compact size="mini" basic color="blue" onClick={this.hideAddForm}>Finish Adding Items!</Button>
                }
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
                {
                    !this.state.edit &&
                    this.props.pantryItems.map(item => {
                        if(item.visible){
                            return <PantryItemCard key={item.id} pantryItem={item} quantityTypes={this.props.quantityTypes} />
                        } else {
                            return null
                        }
                    })
                }
                {
                    this.state.edit &&
                    <React.Fragment>
                        {
                            this.props.pantryItems.map(item => {
                                if(item.visible){
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
                    </React.Fragment>
                }
            </div>
        )
    }
}