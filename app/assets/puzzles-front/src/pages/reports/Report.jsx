import React, { useEffect, useState } from 'react';
import Title from '../../partials/Title';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../../styles/reports/report.scss';
import useProductReport from '../../hooks/reports/useProductReport';
import Loading from '../../partials/Loading';
import Stack from '@mui/material/Stack'
import ReportFilters from './ReportFilters';
import ReportPanels from './ReportPanels';
import { useTranslation } from 'react-i18next';
import CurrentProductDetails from './partials/CurrentProductDetails';
import useXlsxReportExport from '../../hooks/xlsx/useXlsxReportExport';
import XlsxPopUp from './xlsx/XlsxPopUp';
import Dialog from '@mui/material/Dialog'
import { ReportColumns } from '../../hooks/reports/useColumns';
import checkAnimation from '../../assets/icons/check.gif'

function Report() {
    const { fetchProductReport, productReport, loading } = useProductReport();
    const [currentProductId, setCurrentProductId] = useState(null);
    const [filename, setFileName] = useState('');
    const [columnList, setColumnList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [open, setOpen] = useState(false);
    const [xlOpen, setXlOpen] = useState(false);
    const { t } = useTranslation();
    const { handleExport } = useXlsxReportExport();
    const [selectedColumns, setSelectedColumns] = useState(() => {
        const initialSelected = ReportColumns.map((e) => e.column_id);
        return initialSelected;
    });

    const [reportFilter, setReportFilter] = useState({
        start_date: '',
        end_date: '',
        name: ''
    });

    useEffect(() => {
        fetchProductReport(reportFilter);
    }, []);

    useEffect(() => {
        if (!loading) {
            let total = 0;
            productReport.forEach((e) => total += Number(e.total_price));
            setTotalPrice(total);
        }
    }, [productReport, loading]);

    const handleCurrentProduct = (product) => {
        setOpen(true);
        setCurrentProductId(product.product_id);
    };

    const [checkOpen, setCheckOpen] = useState(false)
    const handleExcel = () => {
        const filteredData = productReport.map(item => {
            const filteredItem = {};
            selectedColumns.forEach(column => {
                filteredItem[column] = item[column];
            });
            return filteredItem;
        });

        handleExport({ data: filteredData, filename: filename, column_list: selectedColumns });
        setXlOpen(false)
        setCheckOpen(true)
        setTimeout(() => {
            setCheckOpen(false)
        }, 2000)
    };

    const handleCheckClose = () => {
        setCheckOpen(false)
    }
    return (
        <>
            <Dialog
                onClose={handleCheckClose}
                open={checkOpen}
            >
                <Stack
                    direction={'column'}
                    alignItems={'center'}
                    gap={'15px'}
                >
                    <img src={'https://i.gifer.com/7efs.gif'}/>
                    <Typography
                        fontSize={'30px'}
                    >მზადაა...</Typography>
                </Stack>
            </Dialog>
            <XlsxPopUp
                open={xlOpen}
                setOpen={setXlOpen}
                fileName={filename}
                setFileName={setFileName}
                handleExcel={handleExcel}
                columnList={columnList}
                setColumnList={setColumnList}
            />
            <CurrentProductDetails
                open={open}
                setOpen={setOpen}
                product_id={currentProductId}
            />

            <Title title={t('headers.report')} />
            <ReportFilters
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
                fetchProductReport={fetchProductReport}
                reportFilter={reportFilter}
                setReportFilter={setReportFilter}
                setXlOpen={setXlOpen}
            />

            <ReportPanels totalPrice={totalPrice} />

            <Grid container mt={5}>
                {ReportColumns.filter(column => selectedColumns.includes(column.column_id)).map((e) => (
                    <Grid key={e.column_id} item xs>
                        <Typography className='report-header-title'>{t(e.title)}</Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid className='report-header' container flexDirection={'row'} mt={3}>
                {loading ? (
                    <Loading msg={'ჩეიტვირთება და მერე ქენი'} />
                ) : (
                    productReport && productReport.map((e) => (
                        <Grid key={e.id} container className='row' onClick={() => handleCurrentProduct(e)}>
                            {ReportColumns.filter(column => selectedColumns.includes(column.column_id)).map((column) => (
                                <Grid key={column.column_id} item xs>
                                    <Typography className='stock-title'>{e[column.column_id]}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
}

export default Report;
