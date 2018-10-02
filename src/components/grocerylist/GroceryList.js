import React, { Component } from "react";
// import QtyConverter from "../../modules/QtyConverter";
import { Checkbox, Button, Divider, Container, Icon } from "semantic-ui-react";
import "./groceryList.css";
import GroceryPurchasedForm from "./GroceryPurchaseForm";
import DataManager from "../../modules/DataManager";
import QtyConverter from "../../modules/QtyConverter";

export default class GroceryList extends Component {
    state = {
        edit: false,
        boughtGroceries: []
    }
    
    buyGrocery = (gItem) => {
        let boughtGroceries = this.state.boughtGroceries
        if(boughtGroceries.find(g => g.id === gItem.id)){
            this.setState({boughtGroceries: boughtGroceries.filter(g => g.id !== gItem.id)})
        } else {
            boughtGroceries.push(gItem)
            this.setState({boughtGroceries: boughtGroceries})
        }
    }

    removeItem = (item) => {
        DataManager.delete("groceryItems", item.id)
        .then(() => {this.props.updateGroceryItemState()})
        .then(() => this.setState({boughtGroceries: this.state.boughtGroceries.filter(g => g.id !== item.id)}))
    }

    clearGrocery = (item) => {
        let boughtGroceries = this.state.boughtGroceries;
        let remainingGroceries = boughtGroceries.filter(grocery => item.groceryItemId !== grocery.id)
        this.setState({boughtGroceries: remainingGroceries})
    }

    render(){
        return (
            <div className="grocery-list">
                <Container>
                    <div className="button-right">
                        {
                            this.state.edit &&
                            <Button basic color="orange" size="mini" animated content="Finish" onClick={() => {this.setState({edit: false})}}>
                                <Button.Content visible>Finish</Button.Content>
                                <Button.Content hidden><Icon name="checkmark" /></Button.Content>
                            </Button>
                        }
                        {
                            !this.state.edit &&
                            <Button basic color="teal" size="mini" animated onClick={() => {this.setState({edit: true})}}>
                                <Button.Content visible>Edit</Button.Content>
                                <Button.Content hidden><Icon name="exchange" /></Button.Content>
                            </Button>
                        }
                    </div>
                    <h2 className="centered logo-font">Grocery List</h2>
                    <Divider horizontal>items to buy</Divider>
                    <div className="grocery-dividers">
                        <span className="recipe-divider">Recipe</span>
                        <span className="ingredient-divider">Ingredient</span>
                        <span className="need-divider">Need</span>
                        <span className="bought-divider">Bought</span>
                    </div>
                    <Divider />
                    <Divider />
                    {
                        this.props.groceryItems.length === 0 &&
                        <p className="small-span-empty">You don't have any items in your grocery list!</p>
                    }
                    {
                        this.props.groceryItems.length > 0 &&
                        !this.state.edit &&
                        this.props.groceryItems.map(gItem => {
                            let pItem = this.props.pantryItems.find(pItem => pItem.id === gItem.pantryItemId)
                            let recipe = this.props.recipes.find(recipe => recipe.id === gItem.recipeId)
                            let qtyType = this.props.quantityTypes.find(type => type.id === gItem.qtyTypeCalledFor).name
                            let qty = QtyConverter.convertFromTSP(gItem.qtyNeeded, qtyType)
                            if(qty < 0){
                                qty = 0
                            }
                            return (
                                <div key={gItem.id}>
                                    <div className="grocery-item-card">
                                        <p className="grocery-item-name"><span className="small-span">for: {recipe.name}</span><span className="ingredient-name-span">{pItem.name}</span> <span className="qty-span">{qty} {qtyType}</span></p>
                                        <div>
                                            <Checkbox slider onClick={() => {this.buyGrocery(gItem)}}/>
                                        </div>
                                    </div>
                                    <Divider fitted />
                                </div>
                            )
                        })
                    }
                    {
                        this.state.edit &&
                        this.props.groceryItems.map(gItem => {
                            let pItem = this.props.pantryItems.find(pItem => pItem.id === gItem.pantryItemId)
                            let recipe = this.props.recipes.find(recipe => recipe.id === gItem.recipeId)
                            return (
                                <div>
                                    <div key={gItem.id} className="grocery-item-card">
                                        <p className="grocery-item-name"><span className="small-span">for: {recipe.name}</span><span>{pItem.name}</span></p>
                                        <div className="button-right">
                                            <div>
                                                <Button basic compact size="mini" animated color="red" onClick={() => {this.removeItem(gItem)}}>
                                                    <Button.Content hidden>Remove</Button.Content>
                                                    <Button.Content visible><Icon name="eraser" /></Button.Content>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider fitted />
                                </div>
                            )
                        })

                    }
                    <div className="button-center input-margin">
                        <GroceryPurchasedForm boughtGroceries={this.state.boughtGroceries} 
                                                quantityTypes={this.props.quantityTypes} 
                                                pantryItems={this.props.pantryItems} 
                                                updatePantryItemState={this.props.updatePantryItemState}
                                                updateGroceryItemState={this.props.updateGroceryItemState}
                                                clearGrocery={this.clearGrocery} />
                    </div>
                </Container>
            </div>
        )
    }
}