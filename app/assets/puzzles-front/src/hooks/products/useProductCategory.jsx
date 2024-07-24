import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useProductCategory() {
    const [catProd, setCatProd] = useState([])

    const fetchCatProd = async (cat_id) => {
        await instance.post("/show_by_cat", { cat_id: cat_id },
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
        )
            .then((res) => {
                console.log(res.data)
                setCatProd(res.data)
            })
    }
    return { catProd, fetchCatProd }
}

export default useProductCategory