import React, { Component } from "react";
import QtyConverter from "../../modules/QtyConverter";

export default class GroceryList extends Component {
    
    doMath = (item) => {
        let quantityType = this.props.quantityTypes.find(type => type.id === item.quantityTypeId).name
        console.log(quantityType);
        console.log(QtyConverter.convertToTSP(item.quantity, quantityType))
        console.log(QtyConverter.convertFromTSP(item.quantity, quantityType))
    }
    
    render(){
        return (
            <div className="grocery-list">
                <button>Click to calculate</button>
                {
                    this.props.pantryItems.map(item => <div key={item.id}><p>{item.name}</p><button onClick={() => {this.doMath(item)}}>Click To Calculate</button></div>)
                }
            </div>
        )
    }
}