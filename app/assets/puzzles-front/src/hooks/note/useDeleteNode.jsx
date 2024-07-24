import React from 'react'
import instance from '../../AxiosInstance'

function useDeleteNode() {
    const deleteNote = async (id) => {
        await instance.delete(`/notes/${id}`, {
            headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
        })
            .then((res) => {
                window.location.reload()
                console.log("note removed")
            })
    }
    return { deleteNote }
}

export default useDeleteNode