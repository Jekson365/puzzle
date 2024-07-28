import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import excelIcon from '../../assets/icons/excel.png';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { ReportColumns } from '../../hooks/reports/useColumns';

function ReportFilters({ reportFilter, setReportFilter, fetchProductReport, setXlOpen, selectedColumns, setSelectedColumns }) {
    const { t } = useTranslation();
    const [colOpen,setColOpen] = useState(false)
    const handleReport = () => {
        fetchProductReport(reportFilter);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedColumns((prevSelected) =>
            checked ? [...prevSelected, name] : prevSelected.filter(column => column !== name)
        );
    };

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={3} gap={'10px'}>
            <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                    <label>{t('list.filters.start_date')}</label>
                    <input
                        onChange={(e) => setReportFilter({ ...reportFilter, start_date: e.target.value })}
                        className="custom-input-field" type='date' />
                </Stack>
                <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                    <label>{t('list.filters.end_date')}</label>
                    <input
                        onChange={(e) => setReportFilter({ ...reportFilter, end_date: e.target.value })}
                        className="custom-input-field" type='date' />
                </Stack>
                <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                    <label>{t('list.filters.title')}</label>
                    <input
                        onChange={(e) => setReportFilter({ ...reportFilter, name: e.target.value })}
                        className="custom-input-field" type='text' />
                </Stack>
                <Stack mt={3.4}>
                    <button className="main-button main-button-red" onClick={handleReport}>
                        {t('list.filters.filter')}
                    </button>
                </Stack>
            </Stack>
            <Stack direction={'row'} gap={'10px'} alignItems={'center'} mt={4} position={'relative'}>
                <Box>
                    <button
                    onClick={()=>setColOpen(!colOpen)}
                    className="main-button main-button-gray">სვეტები</button>
                </Box>
                <Box
                    style={{
                        position: "absolute",
                        top: "45px",
                        width: "200px",
                        right: "50px",
                        background: "white",
                        border:"0.5px solid rgba(0,0,0,0.1)",
                        display:colOpen ? 'block' : "none"
                    }}
                    p={2}
                >
                    <Stack direction={'column'} alignItems={'flex-start'}>
                        {ReportColumns.map((e) => (
                            <Stack key={e.column_id} direction={'row'} gap={'10px'} alignItems={'center'}>
                                <Checkbox
                                    name={e.column_id}
                                    checked={selectedColumns.includes(e.column_id)}
                                    onChange={handleCheckboxChange}
                                />
                                <Typography>{t(e.title)}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                <Stack>
                    <Box className='excel-icon' onClick={() => setXlOpen(true)}>
                        <img src={excelIcon} alt="ms-excel--v1" />
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ReportFilters;
