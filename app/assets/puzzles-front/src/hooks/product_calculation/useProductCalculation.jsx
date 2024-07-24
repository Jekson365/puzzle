import React from 'react'
import instance from '../../AxiosInstance'

function useProductCalculation() {
    const handleProductCalculation = (inputs) => {
        instance.post("/product_calculations", { product_calculation: inputs },
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                console.log("created")
            })
    }
    return { handleProductCalculation }
}

export default useProductCalculation