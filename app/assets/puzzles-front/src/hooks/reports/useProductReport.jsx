import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useProductReport() {
    const [productReport, setProductReport] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchProductReport = async (params) => {
        await instance.post("/reports/products", params)
            .then((res) => {
                setProductReport(res.data)
                setLoading(false)

            })
    }
    return { fetchProductReport, productReport, loading }
}

export default useProductReport