import React, { useEffect } from 'react'
import Title from '../../partials/Title'
import useShowOrder from '../../hooks/orders/useShowOrder'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import '../../styles/currentorder.scss'

import useIndexOrder from '../../hooks/orders/useIndexOrder'
import useMakeReady from '../../hooks/orders/useMakeReady'
import MinTitle from '../../partials/MinTitle'
import { useTranslation } from 'react-i18next'
import useOrderRemove from '../../hooks/orders/useRemoveOrder'


function OrderPage() {
  const { orders, fetchIndexOrders } = useIndexOrder()
  const { currentOrder, fetchOrder } = useShowOrder()
  const { handleOrderRemove } = useOrderRemove()
  const { t } = useTranslation()
  const { makeReady } = useMakeReady()
  const handleOrderShow = (id) => {
    fetchOrder(id)
  }
  useEffect(() => {
    console.log(currentOrder)
  }, [currentOrder])

  useEffect(() => {
    fetchIndexOrders()
  }, [])
  return (
    <>
      <Grid container columnSpacing={2} height={'95%'}>
        <Grid item xs={8}>
          <Stack >
            <Title title={t('headers.orders')} />
            <MinTitle title={t('orders.ongoing')} />
            <Stack direction={'row'} flexWrap={'wrap'} gap={'20px'} mt={4}>
              {orders && orders.filter((e) => !e.ready).map((e) => {
                return (
                  <>
                    <Box onClick={() => handleOrderShow(e.id)} className='order-number-list-item ready'>
                      <h1>{e.current_order_id}</h1>
                    </Box>
                  </>
                )
              })}
            </Stack>
            <MinTitle title={t('orders.ready')} />
            <Stack direction={'row'} flexWrap={'wrap'} gap={'20px'} mt={4}>
              {orders && orders.filter((e) => e.ready).map((e) => {
                return (
                  <>
                    <Box onClick={() => handleOrderShow(e.id)} className={`order-number-list-item not-ready`}>
                      <h1>{e.current_order_id}</h1>
                    </Box>
                  </>
                )
              })}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <div className="cover-check">
            <Box
              height={'95%'}
              bgcolor={'#1D3354'}
              p={2}
            >
              <Stack direction={'column'} justifyContent={'space-between'} height={'100%'}>
                <Box className='check-inner-container'>
                  <Stack direction={'row'} gap={'20px'} justifyContent={'space-between'}>
                    <Box className={'id-container'}>{currentOrder.current_order_id}</Box>
                    <Box className={`id-container f-s ${currentOrder.ready ? 'second' : null}`}>{currentOrder.ready ? t('orders.ready') : t('orders.ongoing')}</Box>
                  </Stack>
                  {currentOrder && currentOrder.ordered_products ? (
                    currentOrder.ordered_products.map((e) => {
                      return (
                        <Box key={e.id}>
                          <Typography color={'white'} mt={3}>
                            {e.product.name} - {e.amount}X
                          </Typography>
                          {e.ordered_types && e.ordered_types.length > 0 && (
                            <Stack ml={2} direction={'column'} mt={1}>
                              {e.ordered_types.map((type) => {
                                return (
                                  <Typography key={type.id} color={'white'}>
                                    {type.more ? `+ ${type.stock.name}` : null}
                                    {!type.less ? `- ${type.stock.name}` : null}
                                  </Typography>
                                )
                              })}
                            </Stack>
                          )}
                        </Box>
                      )
                    })
                  ) : null}
                </Box>
                <Box>
                  <Stack direction={'row'}
                    justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                    <Typography color={'white'} fontSize={'30px'}>{t('orders.sum')}: {currentOrder.total_price}$</Typography>
                    <Stack direction={'row'} gap={'10px'}>
                      <button className='main-button main-button-red outline'
                        onClick={()=>handleOrderRemove(currentOrder.id)}
                      >წაშლა</button>
                      <button className='check-button check-button-green'
                        onClick={() => makeReady(currentOrder.id)}
                      >{t('orders.ready')}</button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </div>
        </Grid>
      </Grid >
    </>
  )
}

export default OrderPage