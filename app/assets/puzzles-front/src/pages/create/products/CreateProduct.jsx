import React, { useState, useEffect } from 'react'
import Title from '../../../partials/Title'
import useCreateProduct from '../../../hooks/products/useCreateProduct'
import useStock from '../../../hooks/stocks/useStock'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import Error from '../../../partials/Error'
import UseCategory from '../../../hooks/categories/UseCategory'
import useSellTypes from '../../../hooks/sell_types/useSellTypes'
import { useTranslation } from 'react-i18next'
import {CreateCategory} from "./CreateCategory.jsx";


function CreateProduct() {
    const {t} = useTranslation()
    const { createProduct, loading } = useCreateProduct()

    const [open, setOpen] = useState(false)
    const [errorType, setErrorType] = useState({ msg: "", variant: "" })

    const { categories } = UseCategory()
    const { sellTypes } = useSellTypes()

    const [productParams, setProductParams] = useState({
        name: '',
        price: '',
        product_image: null,
        category_id: 0,
        sell_type_id: 0
    })

    const handleCreate = async (e) => {
        e.preventDefault()
        const { name, price, product_image } = productParams
        if (name == '') {
            setOpen(true)
            setErrorType({ msg: "დასახელების ველი არ უნდა იყოს ცარიელი", variant: "error" })
        }
        else if (price == '') {
            setOpen(true)
            setErrorType({ msg: "ფასის ველი არ უნდა იყოს ცარიელი", variant: "error" })
        }
        else if (product_image == null) {
            setOpen(true)
            setErrorType({ msg: "ფოტო აუცილებელია", variant: "error" })
        }
        else {
            createProduct(productParams)
            setOpen(true)
            setErrorType({ msg: "პროდუქცია შექმნილია", variant: "success" })
            setInterval(() => {
                window.location.reload()
            }, 500)
        }
    }
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        if (categories && categories.length > 0) {
            setProductParams(prevState => ({ ...prevState, category_id: categories[0].id }))
        }
        if (sellTypes && sellTypes.length > 0) {
            setProductParams(prevState => ({ ...prevState, sell_type_id: sellTypes[0].id }))
        }
    }, [categories,sellTypes])

    return (
        <>
            <Title title={t('headers.create_product')} />
            <Grid container mt={8}>
                <form type='multipart/form-data'>
                    <Stack direction={'row'} gap={'20px'}>
                        <input placeholder='დასახელება' className='custom-input-field' name='name' onChange={(e) => setProductParams({ ...productParams, name: e.target.value })} />
                        <input placeholder='ფასი' className='custom-input-field' name='price' onChange={(e) => setProductParams({ ...productParams, price: e.target.value })} />
                        <select onChange={(e) => setProductParams({ ...productParams, category_id: e.target.value })}
                            defaultValue={categories && categories[0] ? categories[0].id : ''}>
                            {categories && categories.map((e) => {
                                return (
                                    <>
                                        <option value={e.id}>{e.name}</option>
                                    </>
                                )
                            })}
                        </select>
                        <select onChange={(e) => setProductParams({ ...productParams, sell_type_id: e.target.value })}
                            defaultValue={sellTypes && sellTypes[0] ? sellTypes[0].id : ''}>
                            {sellTypes && sellTypes.map((e) => {
                                return (
                                    <>
                                        <option value={e.id}>{e.name}</option>
                                    </>
                                )
                            })}
                        </select>
                        <Button
                            component="label"
                            role={undefined}
                            style={{ background: "#D64045" }}
                            variant="contained"
                            tabIndex={-1}
                        >
                            ატვირთე ფოტო
                            <VisuallyHiddenInput
                                onChange={(e) => setProductParams({ ...productParams, product_image: e.target.files[0] })}
                                type="file" name='product_image' />
                        </Button>
                        <Button
                            onClick={handleCreate}
                            className={'main-button main-button-green'}
                            variant='contained'
                        >ატვირთვა</Button>
                    </Stack>
                </form>
            </Grid>
            <CreateCategory/>
            <Error msg={errorType.msg} variant={errorType.variant} open={open} setOpen={setOpen} />
        </>
    )
}

export default CreateProduct
