import React from 'react'

function useLogOut() {
    const logOutUser = async () => {
        localStorage.setItem("token", null)
        window.location.href = '/'
    }
    return { logOutUser }
}

export default useLogOut