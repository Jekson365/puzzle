import React, { useState } from 'react'

function options() {
    const [options,setOptions] = useState({
        title:"",
        colorRed:"#fb0505",
        colorGreen:"#9dba74"
    })
        
    return {options}
}

export default options