import React, { Component } from "react"
import { Bar } from "react-chartjs-2"


export default class SpoilChart extends Component {
    state = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right'
    }
    

    render(){
        let pantryItems = [] 
        this.props.pantryItems.map(p => pantryItems.push({name: p.name, timesTrashed: p.timesTrashed}))
        pantryItems.sort((a, b) => b.timesTrashed - a.timesTrashed)
        let filteredItems = pantryItems.slice(0, 6)
        let itemNames = []
        filteredItems.map(f => itemNames.push(f.name))
        itemNames.sort()
        let itemTrashkNum = []
        filteredItems.map(f => itemTrashkNum.push(f.timesTrashed))
        console.log(itemNames, itemTrashkNum)
        let graphData = []
        filteredItems.map(f => graphData.push({ x: f.name, y: f.timesTrashed }))
        return (
            <div className="cook-chart">
                <Bar
                    data={{
                        labels: itemNames,
                        datasets:[
                            {
                                label:'Throw Away Percentage',
                                data: graphData,
                                backgroundColor:[
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                    'rgba(255, 99, 132, 0.6)'
                                ],
                                borderColor: "white",
                                hoverBackgroundColor: "rgb(92, 201, 164)",
                                fontColor: "white"
                            }
                        ]
                    }}
                    options={{
                        title:{
                            display:this.state.displayTitle,
                            text: "Most Frequently Trashed Ingredients",
                            fontColor: "rgb(92, 201, 164)",
                            fontSize:25
                        },
                        legend:{
                            display:this.state.displayLegend,
                            position:this.state.legendPosition,
                        }
                    }} />
                    {/* new Chart(document.getElementById("chartjs-1"),{"type":"bar","data":{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"My First Dataset","data":[65,59,80,81,56,55,40],"fill":false,"backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],"borderColor":["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],"borderWidth":1}]},"options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}}); */}
            </div>
        )
    }
}