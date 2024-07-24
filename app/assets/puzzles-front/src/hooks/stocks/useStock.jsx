import React, { useEffect, useState } from 'react'
import axios from 'axios'
import instance from '../../AxiosInstance'

function useStock() {
    const [stock, setStock] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStock = async () => {
        await instance.get("/stocks",
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            })
            .then((res) => {
                setStock(res.data)
                console.log(res.data)
                setLoading(false)
            })
    }
    return { stock, loading, fetchStock }
}

export default useStock