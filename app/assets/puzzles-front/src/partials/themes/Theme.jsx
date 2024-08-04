import React, { useState } from 'react'
import Dialog from "@mui/material/Dialog";
import '../../styles/themes/theme.scss'
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'

export const Theme = ({ open, setOpen }) => {
    const [pallate, setPallate] = useState(0)
    const colors = [
        {
            id: 1,
            colorOne: "#522258",
            colorTwo: "#8C3061",
            colorThree: "#C63C51",
            colorFour: "#D95F59"
        },
        {
            id: 2,
            colorOne: "#201E43",
            colorTwo: "#134B70",
            colorThree: "#508C9B",
            colorFour: "#EEEEEE"
        },
    ]
    const save = () => {
        let current = colors.find((e) => e.id === pallate)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <Box p={1}>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        gap={'50px'}
                    >
                        {colors.map((e) => {
                            return (
                                <>
                                    <Box className={`cover ${e.id === pallate ? 'selected' : ""} `}
                                        onClick={() => setPallate(e.id)}
                                    >
                                        <Stack
                                            alignItems={'center'}
                                            gap={'10px'}
                                            direction={'row'}>
                                            <Box className={'color-box'}
                                                backgroundColor={e.colorOne}
                                            ></Box>
                                            <Box className={'color-box'}
                                                backgroundColor={e.colorTwo}
                                            ></Box>
                                            <Box className={'color-box'}
                                                backgroundColor={e.colorThree}
                                            ></Box>
                                            <Box className={'color-box'}
                                                backgroundColor={e.colorFour}
                                            ></Box>
                                        </Stack>
                                    </Box>
                                </>
                            )
                        })}
                    </Stack>
                    <Box mt={3}>
                        <button
                            className='main-button main-button-green'
                            onClick={save}
                        >შეცვალა</button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}