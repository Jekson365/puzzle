import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useIndexOrder() {
    const [orders, setOrders] = useState([])
    const fetchIndexOrders = async () => {
        instance.get(`/orders`,
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
            )
            .then((res) => {
                setOrders(res.data)
            })
    }
    return { orders, fetchIndexOrders }
}

export default useIndexOrder