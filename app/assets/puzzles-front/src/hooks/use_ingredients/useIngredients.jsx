import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useIngredients() {
    const [ingredients, setIngredients] = useState([])
    const fetchIngredients = async (product_id) => {
        await instance.get(`/ingredient_amounts/${product_id}`,
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                const modifiedData = res.data.map(ingredient => ({
                    ...ingredient,
                    more: false,
                    less: true
                }))
                setIngredients(modifiedData)
            })
    }
    return { ingredients, fetchIngredients, setIngredients }
}

export default useIngredients