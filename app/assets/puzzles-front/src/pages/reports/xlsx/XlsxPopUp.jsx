import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { ReportColumns } from '../../../hooks/reports/useColumns'
import Error from '../../../partials/Error'

function XlsxPopUp({ open, setOpen, setFileName, fileName, handleExcel,
    columnList, setColumnList
}) {
    const { t } = useTranslation()

    const [errorType, setErrorType] = useState({ msg: '', variant: '' })
    const [errorOpen, setErrorOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleExport = () => {
        if (fileName == '') {
            setErrorType({ msg: "ფაილის სახელი აუცილებელია", variant: "error" })
            setErrorOpen(true)
        }
        else {
            setErrorType({ msg: "წარმეტებით გაიგზავნა", variant: "success" })
            setErrorOpen(false)
            handleExcel()
        }
    }

    return (
        <>
            <Error
                msg={errorType.msg}
                variant={errorType.variant}
                open={errorOpen}
                setOpen={setErrorOpen}
            />
            <Dialog open={open} onClose={handleClose}>
                <Box p={2}>
                    <Stack
                        direction={'column'}
                        alignItems={'flex-start'}
                    >
                        <Box mt={2}>
                            <input
                                onChange={(e) => setFileName(e.target.value)}
                                placeholder={t('report.filename')}
                                type="text"
                                className="custom-input-field"
                            />
                        </Box>
                        <Box mt={2}>
                            <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                                <button
                                    className="main-button main-button-green"
                                    onClick={handleExport}
                                >
                                    ექსპორტი
                                </button>
                                <button
                                    className="main-button main-button-red"
                                    onClick={() => setOpen(false)}
                                >
                                    გაუქმება
                                </button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Dialog>
        </>
    )
}

export default XlsxPopUp
