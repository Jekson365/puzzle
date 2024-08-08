import React, { useContext, useEffect } from 'react'
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
    <div className="cover-check">
      <Box height={'95%'} bgcolor={'#1D3354'} p={2}>
        <Stack direction={'column'} justifyContent={'space-between'} height={'100%'}>
          <Stack className='check-inner-container' gap={'10px'} direction={'column'}>
            {checkItems && checkItems.ordered_products_attributes.length > 0 && checkItems.ordered_products_attributes.map((e) => (
              <>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box>
                    <Typography color={'white'} mt={3}>
                      {e.name} - {e.amount}X
                    </Typography>
                    {e.ordered_types_attributes.length > 0 && (
                      <Stack ml={2} direction={'column'} mt={1}>
                        {e.ordered_types_attributes.map((type) => (
                          <Typography key={type.id} color={'white'}>
                            {type.more ? ` + ${type.name}` : null}
                            {!type.less ? ` - ${type.name}` : null}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>
                  <button onClick={() => handleDeleteItem(e.id)}>delete</button>
                </Stack>
              </>
            ))}
          </Stack>
          <Box>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
              <Typography color={'white'} fontSize={'30px'}>ჯამი: {totalPrice}$</Typography>
              <Stack>
                <button className='main-button main-button-green' onClick={handleSend}>დადასტურება</button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  )
}

export default Check
