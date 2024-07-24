import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useEmployeeHistory() {
    const [histories, setHistories] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchHistories = async () => {
        await instance.get("/employees/employees_history")
            .then((res) => {
                setHistories(res.data)
                setLoading(false)
            })
    }
    return { histories, fetchHistories, loading }
}

export default useEmployeeHistory