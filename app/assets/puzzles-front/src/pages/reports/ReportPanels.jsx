import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function ReportPanels({ totalPrice }) {
  return (
    <>
      <Grid container mt={3} width={'90%'}>
        <Grid item xs={2}>
          <Box className='report-panel-item'>
            <Stack
              direction={'column'}
              alignItems={'flex-start'}
              gap={'5px'}
            >
              <Typography className='sum-title'>
                ჯამი
              </Typography>
              <Typography className='sum'>
                {totalPrice}<span>₾</span>
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box className='report-panel-item'>
            <Stack
              direction={'column'}
              alignItems={'flex-start'}
              gap={'5px'}
            >
              <Typography className='sum-title'>
                დღგ
              </Typography>
              <Typography className='sum'>
                {Number(totalPrice * (18/100)).toFixed(2)}<span>₾</span>
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box className='report-panel-item'>
            <Stack
              direction={'column'}
              alignItems={'flex-start'}
              gap={'5px'}
            >
              <Typography className='sum-title'>
                ჯამი - დღგ
              </Typography>
              <Typography className='sum'>
                {totalPrice - (totalPrice * (18/100))}<span>₾</span>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ReportPanels