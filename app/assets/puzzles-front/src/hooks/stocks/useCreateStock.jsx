import React from 'react'
import instance from '../../AxiosInstance'

function useCreateStock() {
    const createStock = async (stockParams) => {
        await instance.post("/stocks", { stock: stockParams },
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                console.log("created")
            })
    }
    return { createStock }
}

export default useCreateStock