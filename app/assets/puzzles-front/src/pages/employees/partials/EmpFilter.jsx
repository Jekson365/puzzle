import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import useStatuses from '../../../hooks/employees/useStatuses'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close';

function EmpFilter({ setFilterKeyWord, setFilterString }) {
    const { t } = useTranslation()
    const { statuses, fetchStatuses } = useStatuses()
    useEffect(() => {
        fetchStatuses()
    }, [])
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} pb={2}>
                <input type="text" placeholder={t('placeholders.full_name')}
                onChange={(e)=>setFilterString(e.target.value)}
                className="custom-input-field" />
                <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                    <Box className='filter-status diff' onClick={() => setFilterKeyWord('')}>
                        <CloseIcon />
                    </Box>
                    {statuses && statuses.map((e) => {
                        return (
                            <>
                                <Box className='filter-status'
                                    onClick={() => setFilterKeyWord(e.id)}
                                >{e.name}</Box>
                            </>
                        )
                    })}
                </Stack>
            </Stack>
        </>
    )
}

export default EmpFilter