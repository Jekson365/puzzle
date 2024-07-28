import React, { useContext, useEffect, useState } from 'react'
import '../../../styles/check.scss'
import Box from '@mui/material/Box'
import { CheckContext } from '../CreateOrderPage'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useOrder from '../../../hooks/orders/useOrder'

function Check() {
  const { checkItems, totalPrice, setTotalPrice, setCheckItems } = useContext(CheckContext)
  const { saveOrder } = useOrder()

  const handleSend = () => {
    saveOrder({ ordered_products_attributes: checkItems.ordered_products_attributes, total_price: totalPrice })
  }

  const handleDeleteItem = (productId) => {
    const updatedItems = checkItems.ordered_products_attributes.filter(item => item.id !== productId)
    setCheckItems({ ...checkItems, ordered_products_attributes: updatedItems })
    const newTotalPrice = updatedItems.reduce((acc, item) => acc + item.amount * item.price, 0)
    setTotalPrice(newTotalPrice)
  }

  useEffect(() => {
    console.log(checkItems)
  }, [checkItems])
  return (
    <>
      <div className="cover-check">
        <Box
          height={'95%'}
          bgcolor={'#1D3354'}
          p={2}
        >
          <Stack direction={'column'} justifyContent={'space-between'} height={'100%'}>
            <Box className='check-inner-container'>
              {checkItems && checkItems.ordered_products_attributes.length > 0 && checkItems.ordered_products_attributes.map((e) => {
                return (
                  <>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Box>

                        <Typography color={'white'} mt={3}>
                          {e.name} - {e.amount}X
                        </Typography>
                        {e.ordered_types_attributes != [] ? (
                          <>
                            <Stack ml={2} direction={'column'} mt={1}>
                              {e.ordered_types_attributes.map((type) => {
                                return (
                                  <>
                                    <Typography color={'white'}>
                                      {type.more ? <> + {type.name}</> : null}
                                      {!type.less ? <> - {type.name}</> : null}
                                    </Typography>
                                  </>
                                )
                              })}
                            </Stack>
                          </>
                        ) : null}
                      </Box>
                      <button onClick={() => handleDeleteItem(e.id)}>delete</button>
                    </Stack>
                  </>
                )
              })}
            </Box>
            <Box>
              <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                <Typography color={'white'} fontSize={'30px'}>ჯამი: {totalPrice}$</Typography>
                <button className='main-button main-button-green'
                  onClick={handleSend}
                >დადასტურება</button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div>
    </>
  )
}

export default Check