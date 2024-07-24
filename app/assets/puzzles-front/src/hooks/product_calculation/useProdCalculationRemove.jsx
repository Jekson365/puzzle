import React from 'react'
import instance from '../../AxiosInstance'

function useProdCalculationRemove() {
    const handleRemove = (id) => {
        instance.delete(`/product_calculations/${id}`,
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                console.log("removed!")
            })
    }
    return { handleRemove }
}

export default useProdCalculationRemove