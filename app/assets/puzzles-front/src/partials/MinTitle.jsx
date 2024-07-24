import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'


function MinTitle({title}) {
    return (
        <>
            <Box className='min-page-title' mt={3}>
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

export default MinTitle