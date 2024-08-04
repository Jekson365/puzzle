import React, { useEffect } from 'react'
import useCreateStock from '../../../hooks/stocks/useCreateStock'
import Title from '../../../partials/Title'
import { useState } from 'react'
import useMeasureUnit from '../../../hooks/measure_unit/useMeasureUnit'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography'
import Error from '../../../partials/Error'
import UseCategory from '../../../hooks/categories/UseCategory'
import { useTranslation } from 'react-i18next'

function CreateStock() {
    const [stockParams, setStockParams] = useState({
        name: "",
        price: "",
        amount: "",
        measure_unit_id: ""
    })
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()
    const [errorType, setErrorType] = useState({ msg: "", variant: "" })

    const { createStock } = useCreateStock()
    const { measureUnit } = useMeasureUnit()

    const handleCreate = async (e) => {
        e.preventDefault()
        const { name, price, amount, measure_unit_id } = stockParams
        if (name == '') {
            setOpen(true)
            setErrorType({ msg: "დასახელების ველი ცარიელი", variant: "error" })
        }
        else if (price == '') {
            setOpen(true)
            setErrorType({ msg: "ფასის ველი ცარიელია", variant: "error" })
        }
        else if (amount == '') {
            setOpen(true)
            setErrorType({ msg: "რაოდენობის ველი ცარიელია", variant: "error" })
        }
        else if (measure_unit_id == '') {
            setOpen(true)
            setErrorType({ msg: "საზომი ერთეულის ველი ველი ცარიელია", variant: "error" })
        }
        else {
            setOpen(true)
            setErrorType({ msg: "მარაგი შექმნილია", variant: "success" })
            createStock(stockParams)
        }
    }
    const handleMeasureUnit = (e) => {
        setStockParams({ ...stockParams, measure_unit_id: e.target.value })
    }
    useEffect(() => {
        if (measureUnit && measureUnit.length > 0) {
            setStockParams(prevState => ({ ...prevState, measure_unit_id: measureUnit[0].id }))
        }
    }, [measureUnit])
    return (
        <>
            <Title title={t('headers.add_stock')} />
            <Grid container mt={8}>
                <form type='multipart/form-data'>
                    <Stack direction={'row'} gap={'20px'}>
                        <input placeholder='დასახელება' className='custom-input-field' name='name' onChange={(e) => setStockParams({ ...stockParams, name: e.target.value })} />
                        <input placeholder='ფასი' className='custom-input-field' name='price' onChange={(e) => setStockParams({ ...stockParams, price: e.target.value })} />
                        <input placeholder='რაოდენობა' className='custom-input-field' name='amount' onChange={(e) => setStockParams({ ...stockParams, amount: e.target.value })} />
                        <select onChange={handleMeasureUnit} defaultValue={measureUnit && measureUnit[0] ? measureUnit[0].id : ''}>
                            {measureUnit && measureUnit.map((e) => {
                                return (
                                    <>
                                        <option value={e.id}>{e.unit}</option>
                                    </>
                                )
                            })}
                        </select>
                        <Button onClick={handleCreate}
                            color='success'
                            className='main-button main-button-green'
                            variant='contained'
                        >ატვირთვა</Button>
                    </Stack>
                </form>
            </Grid>
            <Error msg={errorType.msg} variant={errorType.variant} open={open} setOpen={setOpen} />
        </>
    )
}

export default CreateStock