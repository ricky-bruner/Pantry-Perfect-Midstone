import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import AddRecipeForm from "./AddRecipeForm";
import RecipeEditCard from "./RecipeEditCard";
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Divider } from "semantic-ui-react";
import "./recipeList.css";

export default class RecipeList extends Component {
    state = {
        addForm: false,
        edit: false,
        search: ""
    }

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)})
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
        let recipes = [];
        if(this.state.search.length > 1){
            recipes = this.props.recipes.filter(recipe => {
                return recipe.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            })
        }
        return (
            <div className="recipe-list-container">
                <div className="recipe-list-header">
                    {
                        !this.state.addForm &&
                        !this.state.edit &&
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
                        <Button size="mini" basic color="orange" onClick={this.hideEditCards}>Finish</Button>
                    }
                </div>
                <div className="add-recipe-container">
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
                </div>
                <h2 className="centered logo-font">Recipes</h2>
                <div>
                    <Input fluid icon="search" iconPosition="left" className="input-margin" onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" placeholder="Search for a specific Recipe"></Input>
                </div>
                <div>
                    {
                        !this.state.edit &&
                        recipes.filter(r => !r.retired).filter(r => r.favorite).map(recipe => <RecipeCard key={recipe.id} 
                            user={this.props.user}
                            recipe={recipe} 
                            recipeItems={this.props.recipeItems}
                            pantryItems={this.props.pantryItems} 
                            quantityTypes={this.props.quantityTypes}
                            groceryItems={this.props.groceryItems}
                            updateRecipeState={this.props.updateRecipeState}
                            updateGroceryItemState={this.props.updateGroceryItemState}
                            updatePantryItemState={this.props.updatePantryItemState} />)
                    }
                    {
                        !this.state.edit &&
                        recipes.filter(r => !r.retired).filter(r => !r.favorite).map(recipe => <RecipeCard key={recipe.id} 
                            user={this.props.user}
                            recipe={recipe} 
                            recipeItems={this.props.recipeItems}
                            pantryItems={this.props.pantryItems} 
                            quantityTypes={this.props.quantityTypes}
                            groceryItems={this.props.groceryItems}
                            updateRecipeState={this.props.updateRecipeState}
                            updateGroceryItemState={this.props.updateGroceryItemState}
                            updatePantryItemState={this.props.updatePantryItemState} />)
                    }
                    {
                        this.state.edit &&
                        recipes.filter(r => !r.retired).filter(r => r.favorite).map(recipe => <RecipeEditCard key={recipe.id} 
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
                    {
                        this.state.edit &&
                        recipes.filter(r => !r.retired).filter(r => !r.favorite).map(recipe => <RecipeEditCard key={recipe.id} 
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
                <Divider horizontal>or</Divider>
                <div>
                {
                    !this.state.edit &&
                    this.props.recipes.filter(r => !r.retired).filter(r => r.favorite).map(recipe => {
                        let similar = recipes.find(r => r.id === recipe.id);
                        if(!similar){
                            return <RecipeCard key={recipe.id} 
                                        user={this.props.user}
                                        recipe={recipe} 
                                        recipeItems={this.props.recipeItems}
                                        pantryItems={this.props.pantryItems} 
                                        quantityTypes={this.props.quantityTypes}
                                        groceryItems={this.props.groceryItems}
                                        updateRecipeState={this.props.updateRecipeState}
                                        updateGroceryItemState={this.props.updateGroceryItemState}
                                        updatePantryItemState={this.props.updatePantryItemState} />
                        } else {
                            return null
                        }
                    })
                }
                {
                    !this.state.edit &&
                    this.props.recipes.filter(r => !r.retired).filter(r => !r.favorite).map(recipe => {
                        let similar = recipes.find(r => r.id === recipe.id);
                        if(!similar){
                            return <RecipeCard key={recipe.id} 
                                        user={this.props.user}
                                        recipe={recipe} 
                                        recipeItems={this.props.recipeItems}
                                        pantryItems={this.props.pantryItems} 
                                        quantityTypes={this.props.quantityTypes}
                                        groceryItems={this.props.groceryItems}
                                        updateRecipeState={this.props.updateRecipeState}
                                        updateGroceryItemState={this.props.updateGroceryItemState}
                                        updatePantryItemState={this.props.updatePantryItemState} />
                        } else {
                            return null
                        }
                    })
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