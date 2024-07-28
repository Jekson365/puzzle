import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles';
import Error from '../../../partials/Error'

function EmpDetailPopup({ open, setOpen, currentEmployee }) {
    const [msg, setMsg] = useState({ msg: "", variant: "" })
    const [errorOpen, setErrorOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

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
                                <Typography className='head'>ხელფასი:</Typography>
                                <Typography className='meaning'>{currentEmployee.salary || 'არ არის მითითებული'}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>პირადი ნომერი:</Typography>
                                <Typography className='meaning'>{currentEmployee.private_number || 'არ არის მითითებული'}</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Typography className='head'>ტელეფონის ნომერი:</Typography>
                                <Typography className='meaning'>{currentEmployee.phone_number || 'არ არის მითითებული'}</Typography>
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