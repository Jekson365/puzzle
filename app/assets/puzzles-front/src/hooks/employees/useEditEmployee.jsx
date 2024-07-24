import React from 'react'
import instance from '../../AxiosInstance'

function useEditEmployee() {
    const editEmployee = async (params) => {
        await instance.patch(`/employees/employees/${params.id}`, { employee: params },
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
        )
            .then((res) => {
                window.location.reload()
            })
    }
    return { editEmployee }
}

export default useEditEmployee