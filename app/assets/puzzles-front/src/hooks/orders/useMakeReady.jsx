import React from 'react'
import instance from '../../AxiosInstance'

function useMakeReady() {
    const makeReady = async (id) => {
        await instance.post(`/change_order_status/${id}`, {},
            {
                headers: { Authorization: JSON.parse(localStorage.getItem("token")) }
            }
        )
            .then((res) => {
                window.location.reload()
                console.log("status changed!")
            })
    }

    return { makeReady }
}

export default useMakeReady