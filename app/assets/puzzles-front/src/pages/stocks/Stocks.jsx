import React, { useEffect } from 'react'
import Title from '../../partials/Title'
import '../../styles/stock.scss'
import useStock from '../../hooks/stocks/useStock'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Loading from '../../partials/Loading'
import { useTranslation } from 'react-i18next'

function Stocks() {
    const { stock, loading, fetchStock } = useStock()
    const { t } = useTranslation()
    useEffect(() => {
        fetchStock()
    }, [])
    return (
        <>
            <Title title={t('headers.stock')} />
            <Grid container mt={5}>
                <Grid item xs>
                    <Typography>Id</Typography>
                </Grid>
                <Grid item xs>
                    <Typography>დასახელება</Typography>
                </Grid>
                <Grid item xs>
                    <Typography>ფასი</Typography>
                </Grid>
                <Grid item xs>
                    <Typography>რაოდენობა</Typography>
                </Grid>
                <Grid item xs>
                    <Typography>შექმნის თარიღი</Typography>
                </Grid>
                <Grid item xs>
                    <Typography>საზომი ერთეული</Typography>
                </Grid>
            </Grid>
            <Grid className='header'
            container flexDirection={'row'} mt={3}>
                {loading ? (<>
                    <Loading msg={'იტვირთება'} />
                </>) : (<>
                    {stock && stock.map((e) => {
                        return (
                            <>
                                <Grid container className='row'>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.id}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.name}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.price}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.amount}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.created_at}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.measure_unit.unit}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    })}
                </>)}
            </Grid>
        </>
    )
}

export default Stocks