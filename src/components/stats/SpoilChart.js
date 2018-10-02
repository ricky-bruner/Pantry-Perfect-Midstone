import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"


export default class SpoilChart extends Component {
    state = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right'
    }
    

    render(){
        let pantryItems = [] 
        this.props.pantryItems.filter(p => p.visible).map(pI => pantryItems.push({name: pI.name, timesTrashed: pI.timesTrashed}))
        pantryItems.sort((a, b) => b.timesTrashed - a.timesTrashed)
        let filteredPantryItems = pantryItems.slice(0, 7)
        let pantryItemNames = []
        filteredPantryItems.map(p => pantryItemNames.push(p.name))
        let itemTrashedNum = []
        filteredPantryItems.map(p => itemTrashedNum.push(p.timesTrashed))
        return (
            <div className="spoil-chart">
                <Doughnut
                    data={{
                        labels: pantryItemNames,
                        datasets:[
                            {
                                label:'Toss Percentage',
                                data: itemTrashedNum,
                                backgroundColor:[
                                    'rgba(255, 0, 0, 0.9)',
                                    'rgba(255, 166, 0, 0.9)',
                                    'rgba(255, 255, 0, 0.9)',
                                    'rgba(0, 128, 0, 0.9)',
                                    'rgba(0, 128, 128, 0.9)',
                                    'rgba(0, 0, 255, 0.9)',
                                    'rgba(128, 0, 128, 0.9)'
                                ],
                                borderColor: "white",
                                fontColor: "white"
                            }
                        ]
                    }}
                    options={{
                        title:{
                            display:this.state.displayTitle,
                            text: "Most Frequently Tossed Ingredients",
                            fontColor: "darkred",
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