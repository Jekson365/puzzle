import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';

function Loading({ msg }) {
    return (
        <>
            <div className="loading-cover">
                <div className="dark-overlay"></div>
                <Box sx={{ display: 'flex' }}>
                    <Stack direction={'column'} alignItems={'center'} gap={'20px'}>
                        <CircularProgress
                            size={'100px'}
                        />
                        <Typography ml={1}
                            fontSize={'20px'}
                            color={'white'}

                        >{msg}</Typography>
                    </Stack>
                </Box>
            </div>
        </>
    )
}

export default Loading