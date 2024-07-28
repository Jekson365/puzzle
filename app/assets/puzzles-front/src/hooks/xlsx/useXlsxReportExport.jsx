import React from 'react'
import instance from '../../AxiosInstance'

function useXlsxReportExport() {
    const handleExport = async (data) => {
        await instance.post("/export/report",data)
            .then((res) => {
                console.log("exported!")
            })
    }
    return { handleExport }
}


export default useXlsxReportExport