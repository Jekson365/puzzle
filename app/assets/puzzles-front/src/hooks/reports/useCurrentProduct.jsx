import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useCurrentProduct() {
    const [loading, setLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState([])

    const fetchCurrentProduct = async (params) => {
        await instance.post("/reports/product_details", params)
            .then((res) => {
                console.log("success!")
                console.log(res.data)
                setCurrentProduct(res.data)
                setLoading(false)
            })
    }
    return { currentProduct, fetchCurrentProduct, loading }
}

export default useCurrentProduct