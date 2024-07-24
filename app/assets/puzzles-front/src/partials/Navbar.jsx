import React, { createContext, useContext, useEffect, useState } from 'react';
import '../styles/partials.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import useLogOut from '../hooks/users/useLogOut';
import useCurrentUser from '../hooks/users/useCurrentUser';
import { CurrentUserContext } from '../App';
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';


function Navbar() {
    const { user } = useContext(CurrentUserContext)
    const { t } = useTranslation()
    const { logOutUser } = useLogOut()
    const location = useLocation();
    const [open, setOpen] = useState({});
    const handleClick = (index) => {
        setOpen((prevOpen) => ({
            ...prevOpen,
            [index]: !prevOpen[index],
        }));
    };

    const [locatiom, setLocation] = useState(location.pathname.split("/")[1]);

    useEffect(() => {
        setLocation(location.pathname.split("/")[1]);
    }, [location]);

    const arr = [
        {
            active: locatiom === 'products',
            visible: true,
            name: t('navigation.products'),
            path: '/products',
            nest: []
        },
        {
            active: locatiom === 'orders',
            visible: true,
            name: t('navigation.orders'),
            path: '/orders',
            nest: [
            ]
        },
        {
            active: locatiom === 'neworder',
            visible: true,
            name: t('navigation.new_order'),
            path: '/create_order',
            nest: []
        },
        {
            active: locatiom === 'reports',
            visible: user.admin ? true : false,
            name: t('navigation.report'),
            path: '/reports',
            nest: []
        },
        {
            active: locatiom === 'stock',
            visible: user.admin ? true : false,
            name: t('navigation.stock'),
            path: '/stock',
            nest: []
        },
        {
            active: locatiom === 'note',
            visible: user.admin ? true : false,
            name: t('navigation.note'),
            path: '/note',
            nest: []
        },
        {
            active: locatiom === 'admin',
            visible: user.admin ? true : false,
            name: t('navigation.admin.admin'),
            path: '/create_product',
            nest: [
                {
                    name: t('navigation.admin.create_product'),
                    path: "/create_product"
                },
                {
                    name: t('navigation.admin.add_stock'),
                    path: "/create_stock"
                },
                {
                    name: t('navigation.admin.statistic'),
                    path: '/stats'
                },
                {
                    name: t('navigation.admin.employees'),
                    path: '/employees'
                },
            ]
        },
    ];

    return (
        <div className="nav-bar-container"
            style={locatiom === 'stats' ? { background: ' linear-gradient(180deg, rgba(43, 38, 53,1) 0%, rgba(77,97,126,1) 100%)', transition: "0.3s" } : null}
        >
            <div className="title-section">
                <p className="title">
                    კაფე
                </p>
            </div>
            <div className="nav-components">
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {arr.filter((e) => e.visible).map((e, index) => (
                        <React.Fragment key={index}>
                            <Link to={e.path}
                                style={{ textDecoration: "none", width: "100%" }}
                            >
                                <ListItemText primary={e.name} onClick={() => handleClick(index)}
                                    className={`nav-item-text`} />
                            </Link>
                            {e.nest.length > 0 && e.nest.map((j, nestIndex) => (
                                <Collapse key={nestIndex} in={open[index]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <Box sx={{ pl: 2 }}>
                                            <Link to={j.path} style={{ textDecoration: "none" }}>
                                                <Typography color={'white'}
                                                    className='nav-item-text-inner'>
                                                    <ListItemText primary={j.name} />
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </List>
                                </Collapse>
                            ))}
                        </React.Fragment>
                    ))}
                </List>
            </div>
            <Stack className="extra" gap={'10px'}>
                <Box className='extra-email'>
                    <Typography color={'white'}>
                        {user.email}
                    </Typography>
                </Box>
                <LanguageSwitcher/>
                <button className="main-button main-button-red" onClick={logOutUser}>{t('navigation.logout')}</button>
            </Stack>
            {/* <div className="cover">
                <img src={Logo} className='logo' alt="Logo" />
            </div> */}
        </div>
    );
}

export default Navbar;
