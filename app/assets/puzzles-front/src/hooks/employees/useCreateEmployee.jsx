import React from 'react'
import instance from '../../AxiosInstance'

function useCreateEmployee() {
    const createEmployee = async (params) => {
        await instance.post("/employees/employees", params,
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            })
            .then((res) => {
                window.location.reload()
            })
    }
    return { createEmployee }
}

export default useCreateEmployee