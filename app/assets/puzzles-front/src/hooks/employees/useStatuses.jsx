import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useStatuses() {
    const [statuses, setStatuses] = useState([])
    const fetchStatuses = async () => {
        await instance.get("/employees/statuses")
            .then((res) => {
                setStatuses(res.data)
            })
    }
    return { statuses, fetchStatuses }
}

export default useStatuses