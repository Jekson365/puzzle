import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import useCurrentProduct from '../../../hooks/reports/useCurrentProduct'
import { baseUrl } from '../../../AxiosInstance'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function CurrentProductDetails({ open, setOpen, product_id }) {
    const handleClose = () => {
        setOpen(false)
    }
    const { currentProduct, fetchCurrentProduct, loading } = useCurrentProduct()
    useEffect(() => {
        fetchCurrentProduct({ product_id: product_id })
    }, [product_id])
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Box p={2}>
                    {loading ? (<>
                        <h1>იტვირთება...</h1>
                    </>) :
                        <>
                            <img
                                width={'350px'}
                                src={baseUrl + `/uploads/product/product_image/${currentProduct[0]?.id}/` + currentProduct[0]?.product_image} />
                            
                            <Typography mt={1}
                                textAlign={'center'}
                                fontSize={'20px'}
                            >{currentProduct[0]?.product_name}</Typography>
                            <Stack direction={'row'}
                                mt={2}
                                justifyContent={'space-between'} pl={3} pr={3} alignItems={'flex-start'}>
                                <Stack
                                    direction={'column'}
                                    alignItems={'flex-start'}
                                    gap={'10px'}
                                >
                                    <Typography>ინგრედიენტი</Typography>
                                    {currentProduct && currentProduct.map((e)=> {
                                        return (
                                            <>
                                              <Typography fontSize={'14px'}>
                                                    {e.name}
                                                </Typography>
                                            </>
                                        )
                                    })}
                                </Stack>
                                <Stack
                                    direction={'column'}
                                    alignItems={'center'}
                                    gap={'10px'}
                                >
                                    <Typography>მეტი</Typography>
                                    {currentProduct && currentProduct.map((e) => {
                                        return (
                                            <>
                                                <Typography fontSize={'14px'}>
                                                    {e.more} გ
                                                </Typography>
                                            </>
                                        )
                                    })}
                                </Stack>
                                <Stack
                                    direction={'column'}
                                    alignItems={'center'}
                                    gap={'10px'}
                                >
                                    <Typography>ნაკლები</Typography>
                                    {currentProduct && currentProduct.map((e) => {
                                        return (
                                            <>
                                                <Typography fontSize={'14px'}>
                                                    {e.less} გ
                                                </Typography>
                                            </>
                                        )
                                    })}
                                </Stack>
                            </Stack>
                        </>
                    }
                </Box>
            </Dialog>
        </>
    )
}

export default CurrentProductDetails