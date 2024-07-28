import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles';
import useEditEmployee from '../../../hooks/employees/useEditEmployee'
import useStatuses from '../../../hooks/employees/useStatuses'
import usePositions from '../../../hooks/employees/usePositions'
import Error from '../../../partials/Error'

const CustomDialog = styled(Dialog)(({ theme }) => ({

    '& .MuiDialog-paper': {
        width: '700px',
        maxWidth: 'none',
        padding: "10px"
    },
}));

function EmpEditPopUp({ open, setOpen, currentEmployee }) {
    const [msg, setMsg] = useState({ msg: "", variant: "" })
    const [errorOpen, setErrorOpen] = useState(false)
    const { editEmployee } = useEditEmployee()
    const [empParams, setEmpParams] = useState({
        name: '',
        surname: '',
        birth_date: '',
        status_id: '',
        position_id: '',
        private_number: '',
        phone_number: '',
        salary: '',
    })

    const validateFields = () => {
        if (empParams.name.length < 2 || empParams.name.length > 20) {
            setMsg({ msg: "სახელი უნდა იყოს მინიმუმ 2 და მაქსიმუმ 20 სიმბოლო", variant: "error" });
            return false;
        }
        if (empParams.surname.length < 2 || empParams.surname.length > 20) {
            setMsg({ msg: "გვარი უნდა იყოს მინიმუმ 2 და მაქსიმუმ 20 სიმბოლო", variant: "error" });
            return false;
        }
        if (!/^\d{11}$/.test(empParams.private_number)) {
            setMsg({ msg: "პირადი ნომერი უნდა შედგებოდეს 11 სიმბოლოსგან", variant: "error" });
            return false;
        }
        if (empParams.phone_number.toString().length != 9) {
            setMsg({ msg: "ტელეფონის ნომერი უნდა შეიცავდეს ზუსტად 9 სიმბოლოს", variant: "error" });
            return false;
        }
        if (empParams.salary < 0) {
            setMsg({ msg: "ხელფასი არ შეიძლება იყოს 0 ზე ნკალები", variant: "error" });
            return false;
        }
        return true;
    }

    useEffect(() => {
        console.log(currentEmployee)
        if (currentEmployee) {
            setEmpParams({
                id: currentEmployee.id,
                name: currentEmployee.name || '',
                surname: currentEmployee.surname || '',
                birth_date: currentEmployee.birth_date || '',
                private_number: currentEmployee.private_number || '',
                phone_number: currentEmployee.phone_number || '',
                salary: currentEmployee.salary || ''
                // status_id: currentEmployee.status.id || '',
                // position_id: currentEmployee.position.id || ''
            })
        }
    }, [currentEmployee])

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        if (validateFields()) {
            editEmployee(empParams)
            setErrorOpen(true)
            setMsg({ msg: "მონაცემები განახლდა", variant: "success" });
            handleClose()
        } else {
            setErrorOpen(true);
        }
    }

    const { statuses, fetchStatuses } = useStatuses()
    const { position, fetchPositions } = usePositions()

    useEffect(() => {
        fetchStatuses()
        fetchPositions()
    }, [])

    useEffect(() => {
        console.log(statuses)
    }, [])

    return (
        <>
            <Error msg={msg.msg} variant={msg.variant} open={errorOpen} setOpen={setErrorOpen} />
            <CustomDialog open={open} onClose={handleClose}>
                <Typography
                    fontSize={'20px'}
                    mb={2}>
                    რედაქტირება
                </Typography>
                <Box className='edit-employee-popup'>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <input type="text"
                                value={empParams.name}
                                onChange={(e) => setEmpParams({ ...empParams, name: e.target.value })}
                                placeholder='სახელი'
                                className="custom-input-field" />
                        </Grid>
                        <Grid item xs={6}>
                            <input type="text"
                                value={empParams.surname}
                                onChange={(e) => setEmpParams({ ...empParams, surname: e.target.value })}
                                placeholder='გვარი'
                                className="custom-input-field" />
                        </Grid>
                        <Grid item xs={6}>
                            <input type="text"
                                value={empParams.salary}
                                onChange={(e) => setEmpParams({ ...empParams, salary: e.target.value })}
                                placeholder='ხელფასი'
                                className="custom-input-field" />
                        </Grid>
                        <Grid item xs={6}>
                            <input type="number"
                                value={empParams.private_number}
                                onChange={(e) => setEmpParams({ ...empParams, private_number: e.target.value })}
                                placeholder='პირადი ნომერი'
                                className="custom-input-field" />
                        </Grid>
                        <Grid item xs={6}>
                            <input type="number"
                                value={empParams.phone_number}
                                onChange={(e) => setEmpParams({ ...empParams, phone_number: e.target.value })}
                                placeholder='ტელეფონის ნომერი'
                                className="custom-input-field" />
                        </Grid>
                        <Grid item xs={6}>
                            <input type="date"
                                value={empParams.birth_date}
                                onChange={(e) => setEmpParams({ ...empParams, birth_date: e.target.value })}
                                placeholder='დაბადების თარიღი'
                                className="custom-input-field" />
                        </Grid>
                        <Grid item xs={6}>
                            <select
                                style={{ width: "94.5%" }}
                                value={empParams.status_id}
                                onChange={(e) => setEmpParams({ ...empParams, status_id: e.target.value })}
                                placeholder='სტატუსი'
                                className="custom-input-field">
                                {statuses && statuses.map((e) => {
                                    return (
                                        <>
                                            <option value={e.id}>{e.name}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </Grid>
                        <Grid item xs={6}>
                            <select
                                style={{ width: "94.5%" }}
                                value={empParams.position_id}
                                onChange={(e) => setEmpParams({ ...empParams, position_id: e.target.value })}
                                placeholder='პოზიცია'
                                className="custom-input-field">
                                {position && position.map((e) => {
                                    return (
                                        <>
                                            <option value={e.id}>{e.name}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </Grid>
                    </Grid>
                    <Stack direction={'row'} mt={2} gap={'10px'}>
                        <button onClick={handleClose} className="main-button main-button-red">გაუქმება</button>
                        <button onClick={handleSave} className="main-button main-button-green">შენახვა</button>
                    </Stack>
                </Box>
            </CustomDialog>
        </>
    )
}

export default EmpEditPopUp
