import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useStats() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const fetchStats = async (params) => {
        await instance.post("/statistics/statistic", params)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setLoading(false)
            })
    }
    return { data, loading, fetchStats }
}


export default useStats