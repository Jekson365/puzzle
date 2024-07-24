import React, { useEffect, useState } from 'react'
import axios from 'axios'
import instance from '../../AxiosInstance'

function useMeasureUnit() {
    const [measureUnit, setMeasureUnit] = useState([])
    const fetchMeasureUnit = async () => {
        await instance.get("/measure_units",
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                console.log(res.data)
                setMeasureUnit(res.data)
            })
    }
    useEffect(() => {
        fetchMeasureUnit()
    }, [])

    return { measureUnit }
}

export default useMeasureUnit