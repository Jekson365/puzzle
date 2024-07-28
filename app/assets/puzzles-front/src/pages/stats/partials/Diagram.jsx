import React, { useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box'

function Diagram() {

    return (
        <>
        <h1>hello world</h1>
            <Box
                width='100%'
                height='100%'
            >
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10,12] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5,2],
                        },
                        {
                            data: [1, 3.5, 4, 10.5, 3.5, 9,15],
                        },
                        
                        
                    ]}
                    height={300}
                />
            </Box>
        </>
    );
}

export default Diagram;
