import React, { useEffect, useState } from 'react';
import useCurrentProduct from '../../../hooks/products/useCurrentProduct';
import useStock from '../../../hooks/stocks/useStock';
import Stack from '@mui/material/Stack';
import useProductCalculation from '../../../hooks/product_calculation/useProductCalculation';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useProdCalculationRemove from '../../../hooks/product_calculation/useProdCalculationRemove';
import MinTitle from '../../../partials/MinTitle';
import '../../../styles/currentproduct.scss'
import Typography from '@mui/material/Typography'
import Error from '../../../partials/Error';

function CurrentProduct() {
  const [id, setId] = useState(window.location.href.split('/')[4]);

  const [open, setOpen] = useState(false)
  const [errorType, setErrorType] = useState({ msg: "", variant: "" })

  const { fetchCurrentProduct, currentProduct } = useCurrentProduct();
  const { handleRemove } = useProdCalculationRemove()
  const [prodCalculation, setProdCalculation] = useState([]);

  const { stock, loading, fetchStock } = useStock();
  const { handleProductCalculation } = useProductCalculation();

  const [inputs, setInputs] = useState([]);


  const handleItemRemove = (id) => {
    setOpen(true)
    setErrorType({ msg: "წაიშალა", variant: "success" })
    handleRemove(id)
    setInterval(() => {
      window.location.reload()
    }, 1000)
  }


  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index][event.target.name] = event.target.value;
    setInputs(values);
  };

  const handleInputAdd = () => {
    setInputs([...inputs, { stock_id: '', product_id: id, more: '', less: '' }]);
  };

  const handleSend = () => {
    let isValid = true
    inputs.forEach((e) => {
      const { stock_id, product_id, more, less } = e
      if (stock_id === '') {
        setOpen(true)
        setErrorType({ msg: "მარაგის Id ცარიელია", variant: "error" })
        isValid = false
      }
      else if (product_id === '') {
        setOpen(true)
        setErrorType({ msg: "პროდუქციის ველი ცარიელია", variant: "error" })
        isValid = false
      }
      else if (more == '') {
        setOpen(true)
        setErrorType({ msg: "მეტის ველი ცარიელია", variant: "error" })
        isValid = false
      }
      else if (less == '') {
        setOpen(true)
        setErrorType({ msg: "ნაკლების ველი ცარიელია", variant: "error" })
        isValid = false
      }
    })
    if (isValid) {
      setOpen(true)
      setErrorType({ msg: "ინგრედიენტი დაემატა", variant: "success" })
      handleProductCalculation(inputs)
      setInterval(() => {
        window.location.reload()
      }, 1000)
    }
  };

  useEffect(() => {
    fetchStock();
    fetchCurrentProduct(id);
  }, []);

  useEffect(() => {
    console.log(currentProduct)
  }, [])

  useEffect(() => {
    if (stock.length > 0 && inputs.length === 0) {
      setInputs([{ stock_id: stock[0].id, product_id: id, more: '', less: '' }]);
    }
  }, [stock, currentProduct]);

  return (
    <>
      <h1>{currentProduct.name}</h1>
      <Stack direction={'column'} alignItems={'flex-start'} gap={'20px'}>
        {inputs.map((input, index) => (
          <Stack direction={'row'} gap={'10px'}
            alignItems={'center'} key={index}>
            <select
              style={{ padding: "10px 5px" }}
              value={input.stock_id}
              onChange={(event) => handleInputChange(index, event)}
              name='stock_id'
            >
              {Array.isArray(stock) && stock.length > 0 ? (
                stock.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))
              ) : (
                <option value="">No stock available</option>
              )}
            </select>
            <input
              value={input.more}
              placeholder='მეტი'
              className='custom-input-field'
              name='more'
              onChange={(event) => handleInputChange(index, event)}
            />
            <input
              value={input.less}
              placeholder='ნაკლები'
              name='less'
              className='custom-input-field'
              onChange={(event) => handleInputChange(index, event)}
            />
          </Stack>
        ))}
      </Stack>
      <Stack direction={'row'} gap={'20px'} mt={3}>
        <Button onClick={handleInputAdd} color='success' variant='contained'>დამატება</Button>
        <Button onClick={handleSend} variant='contained'>შენახვა</Button>
      </Stack>
      <MinTitle title={'ინგრედიენტი'} />
      <Stack direction={'column'} alignItems={'flex-start'} gap={'15px'} mt={3}>
        {currentProduct.stocks && currentProduct.stocks.map((s) => (
          <Box className='ing-list'>
            <Stack direction={'row'} width={'100%'} gap={'20px'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography key={s.id}>{s.name}</Typography>
              <Box className='amount-icon more'>
                <div>
                  {currentProduct.ingredient_amounts.find((item) => item.stock_id === s.id)?.more || '/'}
                </div>
                <div className="toast">მეტი</div>
              </Box>
              <Box className='amount-icon less'>
                <div>
                  {currentProduct.ingredient_amounts.find((item) => item.stock_id === s.id)?.less || '/'}
                </div>
                <div className="toast">ნაკლები</div>
              </Box>
              <Box className='remove-icon' onClick={() => handleItemRemove(currentProduct.id)}>
                <ClearIcon />
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Error msg={errorType.msg} open={open} variant={errorType.variant} setOpen={setOpen} />
    </>
  );
}

export default CurrentProduct;
