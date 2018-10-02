
import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"


export default class CookChart extends Component {
    state = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right'
    }
    

    render(){
        let recipes = [] 
        this.props.recipes.filter(r => !r.retired).map(r => recipes.push({name: r.name, timesCooked: r.timesCooked}))
        recipes.sort((a, b) => b.timesCooked - a.timesCooked)
        let filteredRecipes = recipes.slice(0, 8)
        let recipeNames = []
        filteredRecipes.map(r => recipeNames.push(r.name))
        let recipeCookNum = []
        filteredRecipes.map(r => recipeCookNum.push(r.timesCooked))
        return (
            <div className="cook-chart">
                <Doughnut
                    data={{
                        labels: recipeNames,
                        datasets:[
                            {
                                label:'Cook Percentage',
                                data: recipeCookNum,
                                backgroundColor:[
                                    'rgba(255, 99, 132, 0.9)',
                                    'rgba(54, 162, 235, 0.9)',
                                    'rgba(255, 206, 86, 0.9)',
                                    'rgba(75, 192, 192, 0.9)',
                                    'rgba(153, 102, 255, 0.9)',
                                    'rgba(255, 159, 64, 0.9)',
                                    'rgba(255, 99, 132, 0.9)'
                                ],
                                borderColor: "white",
                                fontColor: "white"
                            }
                        ]
                    }}
                    options={{
                        title:{
                            display:this.state.displayTitle,
                            text: "Most Frequently Cooked Meals",
                            fontColor: "rgb(92, 201, 164)",
                            fontSize:25
                        },
                        labels: {
                            fontColor: "white"
                        },
                        legend:{
                            display:this.state.displayLegend,
                            position:this.state.legendPosition,
                        }
                    }} />
            </div>
        )
    }
}
