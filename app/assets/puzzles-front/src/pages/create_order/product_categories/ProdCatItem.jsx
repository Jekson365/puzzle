import React from 'react'
import { baseUrl } from '../../../AxiosInstance'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

function ProdCatItem({ product }) {

    return (
        <>
            <div className="product-item" style={{background:"white"}}>
                <div className="image-container">
                    <img src={baseUrl + product.product_image.url} />
                </div>
                <Stack
                    p={1.5}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    className="product-item-content">
                    <div>{product.name}</div>
                    <div>{product.price}</div>
                </Stack>
            </div>
        </>
    )
}

export default ProdCatItem