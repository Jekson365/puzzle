import React, {useState} from "react";
import instance from "../../AxiosInstance.jsx";

export const useRemoveCategory = () => {
    const [error, setError] = useState({})
    const removeCategory = async (payload) => {
        try {
            const response = await instance.delete(`/categories/${payload}`);
            if (response.status === 422) {
                setError({msg: "კატეგორია დაკავშირებულია პროდუქციაზე", variant: "error"});
            } else {
                window.location.reload();
            }
        } catch (error) {
            setError({msg: "კატეგორია დაკავშირებულია პროდუქციაზე", variant: "error"});
        }
    };

    return {removeCategory, error}
}