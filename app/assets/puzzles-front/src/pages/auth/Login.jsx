import { ClassNames } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import '../../styles/auth/auth.scss'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Logo from '../../assets/logo/puzzles.png'
import AOS from 'aos'
import useUserLogin from '../../hooks/auth/useUserLogin'
import instance from "../../AxiosInstance.jsx";

export default function Login() {
    const { loginUser } = useUserLogin()
    const [userPayload, setUserPayload] = useState(
        {
            email: "",
            password: "",
        }
    )
    const sendData = () => {
        loginUser(userPayload)
    }
    return (
        <div
            data-aos="fade-up"
        >
            <Box
                className='login-cover'
            >
                <Box className='inner-cover'>
                    <Stack
                        direction={'column'}
                        alignItems={'center'}
                        gap={'20px'}
                    >
                        <img src={Logo} width={'180px'} />
                        <Typography className='head'>ავტორიზაცია</Typography>
                        <input type="text"
                            onChange={(e) => setUserPayload({ ...userPayload, email: e.target.value })}
                            placeholder='ფოსტა...'
                            className="input" />
                        <input type="password"
                            onChange={(e) => setUserPayload({ ...userPayload, password: e.target.value })}
                            placeholder='პასვორდი...'
                            className="input" />
                        <button className="login"
                            onClick={sendData}
                        >შესვლა</button>
                        <Typography className='forgot'>დაგავიწყდა პასვორდი?</Typography>
                    </Stack>
                </Box>
            </Box>
        </div>
    )
}
