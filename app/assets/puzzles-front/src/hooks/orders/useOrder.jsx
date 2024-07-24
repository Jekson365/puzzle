import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useOrder() {
    const saveOrder = async (order) => {
        await instance.post("/orders", { orders: order },
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                window.location.href = '/orders'
                console.log(res.data)
            })
    }
    return { saveOrder }
}

export default useOrder