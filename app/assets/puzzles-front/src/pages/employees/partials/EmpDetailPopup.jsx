import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles';
import useEditEmployee from '../../../hooks/employees/useEditEmployee'
import useStatuses from '../../../hooks/employees/useStatuses'
import usePositions from '../../../hooks/employees/usePositions'

function EmpDetailPopup({ open, setOpen, currentEmployee }) {
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        console.log(currentEmployee)
    }, [currentEmployee])

    return (
        <>
            <Dialog open={open}
                onClose={handleClose}
            >
                {currentEmployee ? (<>
                    <Box
                        minWidth={'500px'}
                    >
                        <Stack
                            direction={'column'}
                            alignItems={'flex-start'}
                            gap={'10px'}
                            p={2}
                            className='main-details'
                        >
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>სახელი:</Typography>
                                <Typography className='meaning'>{currentEmployee.name}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>გვარი:</Typography>
                                <Typography className='meaning'>{currentEmployee.surname}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>ასაკი:</Typography>
                                <Typography className='meaning'>{currentEmployee.age || 'არ არის მითითებული'}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>დაბადების თარიღი:</Typography>
                                <Typography className='meaning'>{currentEmployee.birth_date || 'არ არის მითითებული'}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>პოზიცია:</Typography>
                                <Typography className='meaning'>{currentEmployee.position?.name || 'არ არის მითითებული'}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>სტატუსი:</Typography>
                                <Typography className='meaning'>{currentEmployee.status?.name || 'არ არის მითითებული'}</Typography>
                            </Stack>
                            <button className="main-button main-button-green"
                                onClick={handleClose}
                            >დახურვა</button>
                        </Stack>
                    </Box>
                </>) : null}
            </Dialog>
        </>
    )
}

export default EmpDetailPopup