import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useEmployeeHistory from '../../../hooks/employees/useEmployeeHistory'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'


function EmpHistory() {
    const { histories, fetchHistories, loading } = useEmployeeHistory()
    const { t } = useTranslation()
    const [filterString, setFIlterString] = useState("")
    useEffect(() => {
        fetchHistories()
    }, [])
    if (!loading) {

        return (
            <>
                <Box mt={3}>
                    <input type="text"
                        placeholder={t('placeholders.full_name')}
                        className="custom-input-field"
                        onChange={(e) => setFIlterString(e.target.value)}
                    />
                </Box>
                <Grid container mt={5}>
                    <Grid item xs>
                        <Typography className='report-header-title'>Id</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>სახელი</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>გვარი</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>პოზიცია</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>სტატუსი</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>ხელფასი</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>პირადი ნომერი</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography className='report-header-title'>ტელეფონის ნომერი</Typography>
                    </Grid>
                </Grid>
                <Grid container className='history'>
                    {histories && histories.filter((item)=> item.name.includes(filterString) || item.surname.includes(filterString)).map((e) => {
                        return (
                            <>
                                <Grid container className='row'>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.employee_id}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.name}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.surname}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.position}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.status}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.salary}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.private_number}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.phone_number}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    })}
                </Grid>
            </>
        )
    }
}

export default EmpHistory