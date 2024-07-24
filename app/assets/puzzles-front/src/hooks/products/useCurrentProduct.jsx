import React, { useEffect, useState } from 'react'
import instance from '../../AxiosInstance'

function useCurrentProduct() {
    const [currentProduct, setCurrentProduct] = useState({})
    const fetchCurrentProduct = async (id) => {
        instance.get(`/products/${id}`,
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
        )
            .then((res) => {
                console.log(res.data)
                setCurrentProduct(res.data)
            })
    }
    return { fetchCurrentProduct, currentProduct }
}

export default useCurrentProduct