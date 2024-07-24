import React, { createContext, useState } from 'react'
import Title from '../../partials/Title'
import Box from '@mui/material/Box'
import ProductCategories from './product_categories/ProductCategories'
import '../../styles/orders.scss'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Check from './check/Check'
import { useTranslation } from 'react-i18next'

export const CheckContext = createContext({})

function CreateOrderPage() {
  const [totalPrice, setTotalPrice] = useState(0)
  const { t } = useTranslation()


  const [checkItems, setCheckItems] = useState({
    order_id: 100,
    total_price: 10,
    ordered_products_attributes: []
  })

  return (
    <>
      <div className="create-order-cover">
      </div>
      <CheckContext.Provider value={{ checkItems, setCheckItems, totalPrice, setTotalPrice }}>
        <Grid container columnSpacing={2} height={'95%'}>
          <Grid item xs={8}>
            <Stack>
              <Title title={t('headers.new_order')} />
              <Box mt={7.5}>
                <ProductCategories />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Check />
          </Grid>
        </Grid>
      </CheckContext.Provider>
    </>
  )
}

export default CreateOrderPage