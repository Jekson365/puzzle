import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function usePositions() {
    const [position, setPosition] = useState([])
    const fetchPositions = async () => {
        await instance.get("/employees/positions")
            .then((res) => {
                setPosition(res.data)
            })
    }
    return { position, fetchPositions }
}

export default usePositions