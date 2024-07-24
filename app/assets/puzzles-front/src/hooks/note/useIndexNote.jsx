import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useIndexNote() {
    const [notes, setNotes] = useState([])
    const fetchNotes = async () => {
        await instance.get("/notes",
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
            }
        )
            .then((res) => {
                let altered = res.data.map((e) => {
                    let date = new Date(e.reminder_date)
                    return { ...e, reminder_date: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}` }
                })
                setNotes(altered)
            })
    }
    return { notes, fetchNotes }
}

export default useIndexNote