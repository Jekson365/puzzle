import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useCurrentUser() {
    const [user, setUser] = useState('')
    const currentUser = async () => {
        instance.post(`/user`, { token: JSON.parse(localStorage.getItem("token")) })
            .then((res) => {
                setUser(res.data)
            })
    }
    return { currentUser, user }
}

export default useCurrentUser