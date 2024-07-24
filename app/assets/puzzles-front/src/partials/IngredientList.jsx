import React, { act, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import { IngredientContext } from '../pages/create_order/product_categories/ProductCategories'
import Typography from '@mui/material/Typography'
import '../styles/ingredientlist.scss';
import { Height } from '@mui/icons-material'
import { baseUrl } from '../AxiosInstance'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

function IngredientList({ open, setOpen }) {
    const { currentIngredients, setCurrentIngredients, productList, setProductList } = useContext(IngredientContext)

    const handleClose = () => {
        setOpen(false)
    }
    const handleIngredientData = (item, action) => {
        let alteredArray = currentIngredients.ordered_types_attributes.map((each) => {
            if (each && item.name === each.name) {
                if (action === 'more') {
                    return { ...each, more: !each.more }
                } else if (action === 'less') {
                    return { ...each, less: !each.less }
                }
            }
            return each
        });
        setCurrentIngredients({ ...currentIngredients, ordered_types_attributes: alteredArray })
    }
    const handleSubmit = () => {
        setOpen(false)
        setProductList([...productList, currentIngredients])
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose} p={3}>
                {currentIngredients.ordered_types_attributes && currentIngredients.ordered_types_attributes.map((e) => {
                    return (
                        <Stack direction={'column'}>
                            <Box
                                xs={{ Height: "300px" }}
                            >
                            </Box>
                            <Stack
                                m={2}
                                direction={'row'}
                                gap={'20px'}
                                alignItems={'flex-start'}
                                justifyContent={'flex-start'}
                            >
                                <Stack direction={'row'} gap={'10px'}>
                                    <div className="ing-button button-more" onClick={() => handleIngredientData(e, 'more')}>
                                        <div className={`button-inner more ${!e.more ? null : 'button-inner-active'}`}>
                                            <AddIcon />
                                        </div>
                                    </div>
                                    <div className="ing-button button-plus" onClick={() => handleIngredientData(e, 'less')}>
                                        <div className={`button-inner plus ${!e.less ? null : 'button-inner-active'}`}>
                                            <CheckIcon />
                                        </div>
                                    </div>
                                </Stack>
                                <Typography
                                    style={{ fontSize: "40px", textAlign: "left" }}
                                >
                                    {e.name}
                                </Typography>
                            </Stack>
                        </Stack>
                    )
                })}
                <Stack direction={'row'}
                    p={3}
                    justifyContent={'center'} alignItems={'center'} gap={'20px'}>
                    <button className="main-button main-button-red">გაუქმება</button>
                    <button className="main-button main-button-green" onClick={handleSubmit}>დადასტურება</button>
                </Stack>
            </Dialog>
        </>
    )
}

export default IngredientList