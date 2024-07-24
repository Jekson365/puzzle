import React, { useEffect, useState, useTransition } from 'react'
import Title from '../../partials/Title'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../styles/reports/report.scss'
import useProductReport from '../../hooks/reports/useProductReport'
import Loading from '../../partials/Loading'
import ReportFilters from './ReportFilters'
import ReportPanels from './ReportPanels'
import { useTranslation } from 'react-i18next'


function Report() {
    const { fetchProductReport, productReport, loading } = useProductReport()
    const [totalPrice, setTotalPrice] = useState(0)
    const { t } = useTranslation()
    const [reportFilter, setReportFilter] = useState({
        start_date: '',
        end_date: '',
        name: ''
    })

    useEffect(() => {
        fetchProductReport(reportFilter)
    }, [])

    useEffect(() => {
        if (!loading) {
            let total = 0
            productReport.map((e) => total += Number(e.total_price))
            setTotalPrice(total)
        }
    }, [productReport])
    return (
        <>
            <Title title={t('headers.report')} />
            <ReportFilters
                fetchProductReport={fetchProductReport}
                reportFilter={reportFilter}
                setReportFilter={setReportFilter} />

            <ReportPanels totalPrice={totalPrice} />

            <Grid container mt={5}>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.order_id')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.product_id')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.title')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.amount')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.created_date')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.price')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.category')}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography className='report-header-title'>{t('list.sell_type')}</Typography>
                </Grid>
            </Grid>
            <Grid className='report-header' container
                flexDirection={'row'} mt={3}>
                {loading ? (<>
                    <Loading msg={'ჩეიტვირთება და მერე ქენი'} />
                </>) : (<>
                    {productReport && productReport.map((e) => {
                        return (
                            <>
                                <Grid container className='row'>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.current_order_id}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.id}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.name}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.amount}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.created_at}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.total_price} ₾</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.category}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className='stock-title'>{e.sell_type}</Typography>
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

export default Report