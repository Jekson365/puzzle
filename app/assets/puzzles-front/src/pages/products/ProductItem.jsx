import React, { useEffect } from 'react'
import { baseUrl } from '../../AxiosInstance'
import instance from '../../AxiosInstance'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

function ProductItem({ product }) {
    useEffect(()=> {
        console.log(product)
    },[])
    return (
        <>
            <div className="product-item">
                <div className="image-container">
                    <img src={baseUrl + product.product_image.url} />
                </div>
                <Link to={`/product/${product.id}`}>
                    <Stack
                        p={2}
                        color={'black'}
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        className="product-item-content">
                        <div>{product.name}</div>
                        <div>{product.price}</div>
                    </Stack>
                </Link>
            </div>
        </>
    )
}

export default ProductItem