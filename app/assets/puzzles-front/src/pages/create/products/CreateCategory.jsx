import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useCreateCategory} from "../../../hooks/categories/useCreateCategory.jsx";
import useCategory from "../../../hooks/categories/UseCategory.jsx";
import Typography from "@mui/material/Typography";
import '../../../styles/categories.scss';
import Title from "../../../partials/Title.jsx";
import MinTitle from "../../../partials/MinTitle.jsx";
import {Close} from "@mui/icons-material";
import {useRemoveCategory} from "../../../hooks/categories/useRemoveCategory.jsx";
import Error from "../../../partials/Error.jsx";
import AddIcon from "@mui/icons-material/Add";

export const CreateCategory = () => {
    const {createCategory} = useCreateCategory()
    const [open, setOpen] = useState(false)
    const [createError, setCreateError] = useState('')
    const {removeCategory, error} = useRemoveCategory()
    const [addCat, setAddCat] = useState(false)
    const {categories, setCategories, fetchCategories} = useCategory()
    const [catName, setCatName] = useState('')

    const handleCatCreate = () => {
        if (catName !== '') {
            createCategory({name: catName})
        } else {
            setCreateError(({msg: 'კატეგორიის ველი ცარიელია', variant: 'error'}))
            setOpen(true)
        }
    }


    useEffect(() => {
        fetchCategories()
    }, []);

    useEffect(() => {
        if (error.msg) {
            setOpen(true);
        }
    }, [error]);
    return (
        <>
            <Error open={open} setOpen={setOpen} msg={error.msg || createError.msg} variant={error.variant}/>
            <Box mt={5}>
                <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                    <MinTitle title={'კატეგორიის დამატება'}/>
                    <Stack direction={'row'} gap={'20px'} flexWrap={'wrap'}>
                        {categories && categories.map((e) => {
                            return (
                                <>
                                    <Box className={'cat-box-create'}>
                                        <Stack direction={'row'} alignItems={'center'}
                                               mt={0.3}
                                               justifyContent={'space-between'}
                                               gap={'10px'}>
                                            <Typography
                                                color={'black'}
                                            >
                                                {e.name}
                                            </Typography>
                                            <Box
                                                onClick={() => removeCategory(e.id)}
                                                mb={0.5} className={'remove-icon'}>
                                                <Close/>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </>
                            )
                        })}
                        {addCat ?
                            (
                                <>
                                    <input
                                        onChange={(e) => setCatName(e.target.value)}
                                        placeholder={'კატეგორია...'} className={'custom-input-field'}/>
                                    <button className={'main-button main-button-green'}
                                            onClick={handleCatCreate}
                                    >დამატება
                                    </button>
                                </>
                            ) : null}
                        <Box className={'add-icon'} mt={0.9} onClick={() => setAddCat(!addCat)}>
                            <AddIcon/>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}
