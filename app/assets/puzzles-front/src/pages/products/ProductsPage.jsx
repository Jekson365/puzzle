import React, { useContext, useEffect } from 'react'
import useProduct from '../../hooks/products/useProduct'
import Title from '../../partials/Title'
import Grid from '@mui/material/Grid'
import ProductItem from './ProductItem'
import '../../styles/products.scss'
import { CurrentUserContext } from '../../App'
import { useTranslation } from 'react-i18next'

function ProductsPage() {
  const { products, loading, setProducts } = useProduct()
  const {t} = useTranslation()
  const { user } = useContext(CurrentUserContext)

  if (loading) { return <h1>loading...</h1> }
  else {

    return (
      <>
        <Title title={t('headers.products')} />
        <div className="product-cover">
          <Grid container display={'flex'}
            flexWrap={'wrap'}
            className='product-page-list' spacing={5} mt={2}>
              
            {products && products.map((product) => {
              return (
                <>
                  <Grid item xs={3}>
                    <ProductItem product={product} />
                  </Grid>
                </>
              )
            })}
          </Grid>
        </div>
      </>
    )
  }
}

export default ProductsPage