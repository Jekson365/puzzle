import React, { useEffect, useState } from 'react'
import instance from '../../AxiosInstance'

function useSellTypes() {
    const [sellTypes, setSellTypes] = useState()
    const fetchSellTypes = async () => {
        await instance.get("/sell_types",
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                setSellTypes(res.data)
            })
    }
    useEffect(() => {
        fetchSellTypes()
    }, [])
    return { sellTypes }
}

export default useSellTypes