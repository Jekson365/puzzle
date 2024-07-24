import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useEmployee() {
    const [employee, setEmployee] = useState([])

    const fetchEmployees = async () => {
        await instance.get("/employees/employees",
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
        )
            .then((res) => {
                setEmployee(res.data)
            })
    }
    return { employee, fetchEmployees }
}

export default useEmployee