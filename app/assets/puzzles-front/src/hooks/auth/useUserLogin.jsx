import React, { useState } from 'react'
import instance from '../../AxiosInstance'

function useUserLogin() {
    const [user,setUser] = useState()
    const loginUser = async (payload) => {
        await instance.post("/login", payload)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem("token",JSON.stringify(res.data.token))
                    window.location.href = '/orders'
                }
                else {
                    console.log("invalid credentials!")
                }
            })
    }
    return { loginUser }
}

export default useUserLogin