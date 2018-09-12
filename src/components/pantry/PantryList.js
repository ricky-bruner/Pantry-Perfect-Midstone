import React, { Component } from "react";
import PantryItemCard from "./PantryItemCard";
import PantryItemAdd from "./PantryItemAdd";
import PantryItemEditCard from "./PantryItemEditCard";

export default class PantryList extends Component {
    state = {
        edit: false
    }

    renderEditCards = () => {
        this.setState({edit: true})
    }

    renderCards = () => {
        this.setState({edit: false})
    }

    render(){
        console.log("render", this.props)
        return (
            <div className="pantry-list-container">
                <h2>Pantry Items</h2>
                <button onClick={this.renderEditCards}>Edit Pantry?</button>
                <PantryItemAdd user={this.props.user}   
                                addPantryItem={this.props.addPantryItem} 
                                pantryItems={this.props.pantryItems} 
                                quantityTypes={this.props.quantityTypes} />
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
                        <button onClick={this.renderCards}>Finished Editing</button>
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