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
import CurrentProductDetails from './partials/CurrentProductDetails'


function Report() {
    const { fetchProductReport, productReport, loading } = useProductReport()
    const [currentProductId, setCurrentProductId] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [open, setOpen] = useState(false)
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

    const handleCurrentProduct = (product) => {
        setOpen(true)
        console.log(product)
        setCurrentProductId(product.product_id)
    }
    return (
        <>
            <CurrentProductDetails
                open={open}
                setOpen={setOpen}
                product_id={currentProductId}
            />

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
                                <Grid key={e.id} container className='row' onClick={() => handleCurrentProduct(e)}>
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