import React from 'react'
import instance from '../../AxiosInstance'

function useCreateNote() {
    const createNote = async (note) => {
        await instance.post('/notes', { note: note },
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                window.location.reload()
                console.log("note saved!")
            })
    }
    return { createNote }
}

export default useCreateNote