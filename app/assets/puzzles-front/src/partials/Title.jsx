import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function Title({title}) {
    return (
        <>
            <Box className='main-page-title'>
                <Stack
                    direction={'column'}
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                >
                    <Typography className='text'>
                        {title}
                    </Typography>
                </Stack>
            </Box>
        </>
    )
}

export default Title