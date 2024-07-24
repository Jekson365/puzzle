import React, { useEffect, useState } from 'react'
import instance from '../../AxiosInstance'

function useCreateProduct() {

    const [loading, setLoading] = useState(true)

    const createProduct = async (productParams) => {
        await instance.post("/products", productParams,
            {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("token")),
                    'Content-Type': "multipart/form-data"
                },
            }
        )
            .then((res) => {
                console.log('created')
                setLoading(false)
            })
    }

    return { createProduct, loading }
}

export default useCreateProduct