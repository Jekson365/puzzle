import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

function EmployeeNav({ navItems, setActiveIndex,activeIndex }) {

    return (
        <>
            <Stack
                direction={'row'}
                gap={'20px'}
                justifyItems={'center'} justifyContent={'center'}
                className='nav-container'
            >
                {navItems.map((e, i) => {
                    return (
                        <>
                            <Box className={`nav-item`}
                                onClick={() => setActiveIndex(i)}
                            >{e.title}</Box>
                        </>
                    )
                })}
                <div className="nav-item-slide"
                    style={{
                        left: `${activeIndex * 220 + 7}px`
                    }}
                ></div>
            </Stack>
        </>
    )
}

export default EmployeeNav