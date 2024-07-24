import React, { useEffect, useState } from 'react'
import axios from 'axios'
import instance from '../../AxiosInstance'

function useProduct() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        await instance.get("/products",
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
        )
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, setProducts, loading }
}

export default useProduct