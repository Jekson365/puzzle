import React, { useEffect, useState } from 'react'
import '../../styles/employees/employee.scss'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import EmployeeNav from './partials/EmployeeNav'
import useCreateEmployee from '../../hooks/employees/useCreateEmployee'
import useEmployee from '../../hooks/employees/useEmployee'
import EmpEditPopUp from './partials/EmpEditPopUp'
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EmpDetailPopup from './partials/EmpDetailPopup'
import EmpHistory from './history/EmpHistory'
import EmpFilter from './partials/EmpFilter'

function Employees() {
    const { createEmployee } = useCreateEmployee()
    const { employee, fetchEmployees } = useEmployee()
    const [newEmp, setNewNewEmp] = useState(false)
    const [currentEmployee, setCurrentEmployee] = useState({})
    const [open, setOpen] = useState(false)
    const [detOpen, setDetOpen] = useState(false)
    const [filterKeyword, setFilterKeyWord] = useState('')
    const [filterString, setFilterString] = useState('')

    const [empParams, setEmpParams] = useState({
        name: 'dasd',
        surname: "das",
    })

    const fetchCurrent = (id, type) => {
        setCurrentEmployee(employee.find((item) => item.id === id))
        if (type == 'edit') {
            setOpen(true)
        }
        else {
            setDetOpen(true)
        }

    }

    const [navItems, setNavItems] = useState(
        [
            {
                title: "თანამშრომლები",
                active: true
            },
            {
                title: "ისტორია",
                active: false
            }
        ]
    )
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        console.log(filterString)
    }, [filterString])


    useEffect(() => {
        fetchEmployees()
    }, [])
    return (
        <>
            <EmpDetailPopup open={detOpen} setOpen={setDetOpen} currentEmployee={currentEmployee} />
            <EmpEditPopUp open={open} setOpen={setOpen} currentEmployee={currentEmployee} />
            <EmployeeNav navItems={navItems} setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
            {activeIndex == 0 ? (<>
                <Box mt={3}>
                    <EmpFilter
                        setFilterString={setFilterString}
                        setFilterKeyWord={setFilterKeyWord} />
                </Box>
                <Grid container direction="row"
                    flexWrap={'wrap'}
                    className='employ-cont-cover'
                    alignItems="flex-start" spacing={3} mt={0}>
                    {employee
                        .filter((item) => item.name.includes(filterString) || item.surname.includes(filterString))
                        .filter((item) => filterKeyword === "" || item.status.id == filterKeyword)
                        .map((e, index) => (
                            <>
                                <Grid item xs={2} key={index}>
                                    <Box className='employee-box'>
                                        <div className="inner-actions">
                                            <Stack direction={'row'} gap={'10px'}>
                                                <Box className='cirlce'
                                                    onClick={() => fetchCurrent(e.id, 'edit')}
                                                >
                                                    <EditIcon
                                                        className='icon' />
                                                </Box>
                                                <Box className='cirlce'
                                                    onClick={() => fetchCurrent(e.id, 'detail')}
                                                >
                                                    <RemoveRedEyeIcon className='icon' />
                                                </Box>
                                            </Stack>
                                        </div>
                                        <Stack direction='column' alignItems='center'
                                            height={'100%'}
                                            justifyContent={'center'}
                                            gap={'15px'}
                                        >
                                            <div className="image-place">
                                                <PersonIcon className='icon' />
                                            </div>
                                            <Stack direction={'column'} alignItems={'center'} gap={'5px'}>
                                                <Typography className='job'>{e.position.name}</Typography>
                                                <Stack direction={'column'} alignItems={'center'}>
                                                    <Typography className='emp-name'>{e.name}</Typography>
                                                    <Typography className='emp-name'>{e.surname}</Typography>
                                                </Stack>
                                                <Typography className='emp-status'>{e.status.name}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </>
                        ))}
                    {newEmp ? (<>
                        <Grid item xs={2}>
                            <Box className='employee-box'>
                                <Stack direction='column' alignItems='center'
                                    height={'100%'}
                                    justifyContent={'center'}
                                    gap={'15px'}
                                >
                                    <div className="image-place">
                                        <PersonIcon className='icon' />
                                    </div>
                                    <Stack direction={'column'} alignItems={'center'} gap={'5px'}>
                                        <Stack direction={'column'} alignItems={'flex-start'} gap={'5px'}>
                                            <Box width={'50%'}>
                                                <input type="text" className="custom-input-field"
                                                    placeholder='სახელი'
                                                    onChange={(e) => setEmpParams({ ...empParams, name: e.target.value })}
                                                    style={{ 'min-width': "100%", background: "transparent" }}
                                                />
                                            </Box>
                                            <Box width={'50%'}>
                                                <input type="text"
                                                    placeholder='გვარი'
                                                    onChange={(e) => setEmpParams({ ...empParams, surname: e.target.value })}
                                                    className="custom-input-field"
                                                    style={{ 'min-width': "100%", background: "transparent" }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                    <Box mt={1}>
                                        <button
                                            onClick={() => createEmployee(empParams)}
                                            className='main-button main-button-red'>შენახვა</button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                    </>) : null}
                    <Grid item xs={2}>
                        <Box className='employee-box'
                            onClick={() => setNewNewEmp(!newEmp)}
                            style={{ background: "transparent", cursor: "pointer" }}
                        >
                            <Stack direction='column' alignItems='center'
                                height={'100%'}
                                justifyContent={'center'}
                                gap={'30px'}
                            >
                                <div className="image-place"
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                >
                                    <AddIcon className='icon-2' />
                                </div>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </>) : <EmpHistory />}
        </>
    )
}

export default Employees