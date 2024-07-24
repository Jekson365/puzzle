import React, { useEffect, useState } from 'react'
import Title from '../../partials/Title'
import Stack from '@mui/material/Stack'
import useCreateNote from '../../hooks/note/useCreateNote'
import useIndexNote from '../../hooks/note/useIndexNote'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../styles/note.scss'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import useStatusNote from '../../hooks/note/useStatusNote'
import Error from '../../partials/Error'
import useDeleteNode from '../../hooks/note/useDeleteNode'
import { useTranslation } from 'react-i18next'

function Note() {
    const { createNote } = useCreateNote()
    const { notes, fetchNotes } = useIndexNote()
    const { changeStatus } = useStatusNote()
    const { deleteNote } = useDeleteNode()
    const { t } = useTranslation()

    const [open, setOpen] = useState(false)
    const [errorType, setErrorType] = useState({ msg: "", variant: "" })

    const [note, setNote] = useState({
        note: "",
        reminder_date: "",
    })

    const handleNote = () => {
        if (note.note == '') {
            setOpen(true)
            setErrorType({ msg: "ველი ცარიელია", variant: "error" })
        }
        if (note.reminder_date == '') {
            setOpen(true)
            setErrorType({ msg: "ველი ცარიელია", variant: "error" })
        }
        else {
            createNote(note)
            setOpen(true)
            setErrorType({ msg: "ნოუთი დაემატა", variant: "success" })
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])




    return (
        <>
            <Error msg={errorType.msg} variant={errorType.variant} open={open} setOpen={setOpen} />
            <Title title={t('headers.note')} />
            <Stack direction={'row'} gap={'20px'} mt={7}>
                <input type='text'
                    name='note'
                    onChange={(e) => setNote({ ...note, note: e.target.value })}
                    className="custom-input-field" style={{ width: "100%" }} />
                <input
                    name='date'
                    onChange={(e) => setNote({ ...note, reminder_date: e.target.value })}
                    className='custom-input-field' type='datetime-local' />
                <button className=''
                    style={{
                        padding: "0 20px", textAlign: "center", background: "#43bf81"
                        , color: "white",
                        border: "0",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                    onClick={handleNote}
                >დამახსოვრება</button>
            </Stack>
            <Stack direction={'column'} alignItems={'flex-start'} gap={'50px'} mt={5}
                style={{ overflowY: "scroll", height: "600px" }}
            >
                {notes && notes.map((e) => {
                    return (
                        <>
                            <Box className='note-item' width={'97%'}>
                                <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                                    <Stack
                                        width={'100%'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        direction={'row'}>
                                        <Stack direction={'row'} gap={'10px'}>
                                            <Box className='note-date'
                                                style={{ background: e.checked ? '#43bf81' : "#D64045" }}
                                            >
                                                {e.created_at}
                                            </Box>
                                            {e.checked ?
                                                (
                                                    <>
                                                        <Box className='note-date'
                                                            style={{ background: e.checked ? '#43bf81' : "#D64045" }}
                                                        >
                                                            შესრულებულია
                                                        </Box>
                                                    </>
                                                ) : null}
                                        </Stack>

                                        <Stack direction={'row'} gap={'10px'}>
                                            {!e.checked ? (<>
                                                <Box className='note-check' onClick={() => changeStatus(e.id)}>
                                                    <CheckIcon />
                                                </Box>
                                            </>) : null}
                                            <Box className='note-remove' onClick={() => deleteNote(e.id)}>
                                                <CloseIcon />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                    <Typography className='note'>{e.note}</Typography>
                                </Stack>
                            </Box>
                        </>
                    )
                })}
            </Stack>
        </>
    )
}

export default Note