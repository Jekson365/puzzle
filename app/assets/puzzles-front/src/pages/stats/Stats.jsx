import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Diagram from './partials/Diagram'
import '../../styles/stats/stats.scss'
import useProduct from '../../hooks/products/useProduct'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useStats from '../../hooks/stats/useStats'

function Stats() {
    const [params, setParams] = useState()
    const { data, loading, fetchStats } = useStats()
    const { products } = useProduct()
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleFilter = () => {
        console.log(params)
        fetchStats(params)
    }
    // setParams({ ...params, products: selectedOptions })

    return (
        <div>
            <Grid container>
                <Grid item xs={8}>
                    <Diagram />
                </Grid>
                <Grid item xs={4}>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                                <label htmlFor="">საწყისი თარიღი</label>
                                <input
                                    onChange={(e) => setParams({ ...params, start_date: e.target.value })}
                                    type="date"
                                    className="custom-input-field" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                                <label htmlFor="">საბოლოო თარიღი</label>
                                <input
                                    onChange={(e) => setParams({ ...params, end_date: e.target.value })}
                                    type="date"
                                    className="custom-input-field" />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                                <label htmlFor="">პროდუქცია</label>
                                <Autocomplete
                                    multiple
                                    options={products}
                                    getOptionLabel={(product) => product.name}
                                    value={products.filter(product => selectedOptions.includes(product.id))}
                                    onChange={(event, newValue) => {
                                        setSelectedOptions(newValue.map(product => product.id));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Select options" />
                                    )}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={'column'} alignItems={'flex-start'} gap={'10px'}>
                                <button
                                    onClick={handleFilter}
                                    className="main-button main-button-green">გაფილტვრა</button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Stats
