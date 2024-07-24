import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useShowOrder() {
    const [currentOrder, setCurrentOrder] = useState([])
    const fetchOrder = async (id) => {
        instance.get(`/orders/${id}`,
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                setCurrentOrder(res.data)
            })
    }
    return { currentOrder, fetchOrder }
}

export default useShowOrder