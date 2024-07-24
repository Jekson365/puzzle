import React, { useEffect, useState } from 'react'
import instance from '../../AxiosInstance'

function UseCategory() {
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        await instance.get("/categories", {
            headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
        })
            .then((res) => {
                setCategories(res.data)
            })
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    return { categories, setCategories, fetchCategories }
}


export default UseCategory