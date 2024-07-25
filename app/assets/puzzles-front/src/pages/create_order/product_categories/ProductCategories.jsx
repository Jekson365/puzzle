import React, { createContext, useContext, useEffect, useState } from 'react'
import UseCategory from '../../../hooks/categories/UseCategory'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useProductCategory from '../../../hooks/products/useProductCategory'
import ProductItem from '../../products/ProductItem'
import ProdCatItem from './ProdCatItem'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CheckContext } from '../CreateOrderPage'
import IngredientList from '../../../partials/IngredientList'
import useIngredients from '../../../hooks/use_ingredients/useIngredients'
import { CurrentUserContext } from '../../../App'

export const IngredientContext = createContext({})

function ProductCategories() {

    const [open, setOpen] = useState(false)

    const { categories, setCategories, fetchCategories } = UseCategory()
    const { catProd, fetchCatProd } = useProductCategory()

    const [orderedProductAttributes, setOrderedProductAttributes] = useState(['hello owrld'])

    const colors = ['#EB5B00', '#FFB200', '#478CCF', '#4535C1', '#1A5319', "#E68369", "#9CDBA6", "#468585", "#E4003A"]

    const [showCategories, setShowCategories] = useState(true)

    const { checkItems, setCheckItems, totalPrice, setTotalPrice } = useContext(CheckContext)
    const { ingredients, fetchIngredients, setIngredients } = useIngredients()

    const handleCatProductCall = (id) => {
        fetchCatProd(id)
        setShowCategories(false)
    }

    const handleGoBack = () => {
        setShowCategories(true)
        fetchCategories()
        setCategories([])
    }








    const [productList, setProductList] = useState([])
    const [currentIngredients, setCurrentIngredients] = useState([])
    const { user } = useContext(CurrentUserContext)

    const handleCheckItems = (e) => {
        setTotalPrice(totalPrice + Number(e.price))
        if (e.sell_type.name == 'კალკულაცია') {

            let ingArr = e.stocks.map((item) => {
                return { name: item.name, more: false, less: true, stock_id: item.id, product_id: e.id }
            })
            setCurrentIngredients({ ordered_types_attributes: ingArr, name: e.name, product_id: e.id, price: e.price, amount: 1, id: Math.random() })
            setOpen(true)
        } else {
            let finder = productList.find((item) => item.product_id == e.id)
            if (finder) {
                let updatedList = productList.map((each) => {
                    if (each.product_id === e.id) {
                        return { ...each, amount: each.amount + 1 }
                    }
                    return each
                })
                setProductList(updatedList)
            } else {
                let prod = { name: e.name, price: e.price, product_id: e.id, amount: 1, ordered_types_attributes: [], id: Math.random() }
                setProductList([...productList, prod])
            }
        }
    }

    useEffect(() => {
        setCheckItems({ ordered_products_attributes: productList })
    }, [productList])
    return (
        <>
            <IngredientContext.Provider value={{
                currentIngredients,
                setCurrentIngredients,
                setProductList,
                productList,
                handleCheckItems
            }}>
                <IngredientList open={open} setOpen={setOpen} />
            </IngredientContext.Provider>


            {showCategories ? (
                <>
                    <Grid container spacing={1} maxWidth={'1000px'}>
                        {categories && categories.map((e, i) => {
                            return (
                                <Grid item xs={2} key={e.id}>
                                    <Box className='cat-box'
                                        onClick={() => handleCatProductCall(e.id)}
                                        sx={{ background: colors[i] }}
                                    >
                                        <Typography className='inner-text'
                                        >{e.name}</Typography>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </>
            ) : (
                <div className='go-back' onClick={handleGoBack}>
                    <ArrowBackIosIcon className='ds' />
                </div>
            )}
            {!showCategories && catProd && (
                <div className="prod-cover">
                    <Grid container mt={3} spacing={2} pb={2} flexWrap={'wrap'}>
                        {catProd.map((e) => (
                            <Grid item xs={3} key={e.id} onClick={() => handleCheckItems(e)}>
                                <ProdCatItem product={e}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </>
    )
}

export default ProductCategories
