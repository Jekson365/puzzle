import React from 'react'
import instance from '../../AxiosInstance'

function useStatusNote() {
    const changeStatus = async (id) => {
        await instance.post("/change_note_status", { id: id }, {
            headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
        })
            .then((res) => {
                window.location.reload()
            })
    }
    return { changeStatus }
}

export default useStatusNote