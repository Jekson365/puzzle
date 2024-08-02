import React from "react";
import instance from "../../AxiosInstance.jsx";

export const useCreateCategory = () => {
    const createCategory = async (payload) => {
        await instance.post('/categories', payload)
            .then((res) => {
                window.location.reload()
            })
    }
    return {createCategory}
}