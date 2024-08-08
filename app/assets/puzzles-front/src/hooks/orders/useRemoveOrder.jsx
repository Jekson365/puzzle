import React from 'react'
import instance from '../../AxiosInstance'

function useOrderRemove() {
    const handleOrderRemove = (id) => {
        instance.delete(`/orders/${id}`)
            .then((res) => {
                window.location.reload()
            })
    }
    return { handleOrderRemove }
}

export default useOrderRemove