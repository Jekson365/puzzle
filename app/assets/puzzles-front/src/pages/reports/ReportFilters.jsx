import React from 'react'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'

function ReportFilters({ reportFilter, setReportFilter, fetchProductReport }) {
    const { t } = useTranslation()
    const handleReport = () => {
        fetchProductReport(reportFilter)
    }
    return (
        <>
            <Stack
                direction={'row'}
                alignItems={'center'}
                mt={3}
                gap={'10px'}
            >
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
                    <button className="main-button main-button-red"
                        onClick={handleReport}
                    >{t('list.filters.filter')}</button>
                </Stack>
            </Stack>
        </>
    )
}

export default ReportFilters