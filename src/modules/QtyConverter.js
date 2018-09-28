
export default Object.create(null, {
    convertFromTSP:{
        value: (quantity, quantityType) => {
            if(quantityType === "TSP"){
                return quantity / 1
            } else if(quantityType === "TBSP"){
                return quantity / 3
            } else if(quantityType === "OZ"){
                return quantity / 6
            } else if(quantityType === "1/4 CUP"){
                return quantity / 12
            } else if(quantityType === "1/3 CUP"){
                return quantity / 16
            } else if(quantityType === "1/2 CUP"){
                return quantity / 24
            } else if(quantityType === "2/3 CUP"){
                return quantity / 32
            } else if(quantityType === "3/4 CUP"){
                return quantity / 36
            } else if(quantityType === "CUP"){
                return quantity / 48
            }else if(quantityType === "PINT"){
                return quantity / 96
            } else if(quantityType === "QUART"){
                return quantity / 192
            } else if(quantityType === "1/2 GALLON"){
                return quantity / 384
            } else if(quantityType === "GALLON"){
                return quantity / 768
            } else if(quantityType === "LB"){
                return quantity / 96
            } else {
                return null
            }
        }
    },
    convertToTSP: { 
        value: (quantity, quantityType) => {
            if(quantityType === "TSP"){
                return quantity * 1
            } else if(quantityType === "TBSP"){
                return quantity * 3
            } else if(quantityType === "OZ"){
                return quantity * 6
            } else if(quantityType === "1/4 CUP"){
                return quantity * 12
            } else if(quantityType === "1/3 CUP"){
                return quantity * 16
            } else if(quantityType === "1/2 CUP"){
                return quantity * 24
            } else if(quantityType === "2/3 CUP"){
                return quantity * 32
            } else if(quantityType === "3/4 CUP"){
                return quantity * 36
            } else if(quantityType === "CUP"){
                return quantity * 48
            }else if(quantityType === "PINT"){
                return quantity * 96
            } else if(quantityType === "QUART"){
                return quantity * 192
            } else if(quantityType === "1/2 GALLON"){
                return quantity * 384
            } else if(quantityType === "GALLON"){
                return quantity * 768
            } else if(quantityType === "LB"){
                return quantity * 96
            } else {
                return null
            }
        }
    }
})

