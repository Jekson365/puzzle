import React from 'react'
import instance from '../../AxiosInstance'

function useProductRemove() {
    const handleProductRemove = (id) => {
        instance.delete(`/products/${id}`)
            .then((res) => {
                window.location.reload()
            })
    }
    return { handleProductRemove }
}

export default useProductRemove