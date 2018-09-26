import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeForm from "./AddRecipeForm";
import RecipeEditCard from "./RecipeEditCard";
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from "semantic-ui-react";
import "./recipeList.css";

export default class RecipeList extends Component {
    state = {
        addForm: false,
        edit: false
    }

    renderAddForm = () => {
        this.setState({
            addForm: true
        })
    }

    renderEditCards = () => {
        this.setState({edit: true})
    }

    hideEditCards = () => {
        this.setState({edit: false})
    }

    hideAddForm = () => {
        this.setState({addForm: false})
    }
    
    render(){
        return (
            <div className="recipe-list-container">
                    <h2 className="centered">Recipes</h2>
                    <div className="recipe-list-header">
                            {
                                !this.state.addForm &&
                                <Button basic animated color="teal" size="mini" onClick={this.renderAddForm}>
                                    <Button.Content visible>Add</Button.Content>
                                    <Button.Content hidden><Icon name="add"/></Button.Content>
                                </Button>
                            }
                            {
                                this.state.addForm &&
                                <Button basic color="teal" size="mini" onClick={this.hideAddForm}>Cancel</Button>
                            }
                            {
                                !this.state.addForm &&
                                !this.state.edit &&
                                <Button basic animated color="teal" size="mini" onClick={this.renderEditCards}>
                                    <Button.Content visible>Edit</Button.Content>
                                    <Button.Content hidden><Icon name="exchange"/></Button.Content>
                                </Button>
                            }
                            {
                                this.state.edit &&
                                <button onClick={this.hideEditCards}>Finish Edits</button>
                            }
                </div>
                <div>
                {
                    this.state.addForm &&
                    <AddRecipeForm user={this.props.user} 
                        updateRecipeState={this.props.updateRecipeState}    
                        updateRecipeItemState={this.props.updateRecipeItemState}
                        hideAddForm={this.hideAddForm}
                        editPantryItem={this.props.editPantryItem} 
                        addPantryItem={this.props.addPantryItem}    
                        recipes={this.props.recipes}
                        pantryItems={this.props.pantryItems} 
                        recipeItems={this.props.recipeItems} 
                        quantityTypes={this.props.quantityTypes}/>
                }
                {
                    !this.state.edit &&
                    this.props.recipes.filter(r => !r.retired).map(recipe => <RecipeCard key={recipe.id} 
                        user={this.props.user}
                        recipe={recipe} 
                        recipeItems={this.props.recipeItems}
                        pantryItems={this.props.pantryItems} 
                        quantityTypes={this.props.quantityTypes}
                        updateRecipeState={this.props.updateRecipeState}
                        updateGroceryItemState={this.props.updateGroceryItemState}
                        updatePantryItemState={this.props.updatePantryItemState} />)
                }
                {
                    this.state.edit &&
                    this.props.recipes.filter(r => !r.retired).map(recipe => <RecipeEditCard key={recipe.id} 
                        recipe={recipe} 
                        user={this.props.user}
                        updateRecipeState={this.props.updateRecipeState}    
                        updateRecipeItemState={this.props.updateRecipeItemState}
                        allRecipes={this.props.recipes}
                        recipeItems={this.props.recipeItems}
                        pantryItems={this.props.pantryItems} 
                        quantityTypes={this.props.quantityTypes}
                        editPantryItem={this.props.editPantryItem} 
                        addPantryItem={this.props.addPantryItem} />)
                }
                </div>
            </div>
        )
    }
}