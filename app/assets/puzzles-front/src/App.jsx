import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import './styles/index.scss'
import Navbar from './partials/Navbar'
import Grid from '@mui/material/Grid'
import ProductsPage from './pages/products/ProductsPage'
import CreateProduct from './pages/create/products/CreateProduct'
import Stocks from './pages/stocks/Stocks'
import CreateStock from './pages/create/stocks/CreateStock'
import CurrentProduct from './pages/create/products/CurrentProduct'
import OrderPage from './pages/orders/OrderPage'
import CreateOrderPage from './pages/create_order/CreateOrderPage'
import Note from './pages/notes/Note'
import Login from './pages/auth/Login'
import { useLocation } from 'react-router-dom'
import useLogOut from './hooks/users/useLogOut'
import useCurrentUser from './hooks/users/useCurrentUser'
import Employees from './pages/employees/Employees'
import Report from './pages/reports/Report'
import Stats from './pages/stats/Stats'
import {AdminPanel} from "./pages/admin/AdminPanel.jsx";

export const CurrentUserContext = createContext({})


function App() {
  const location = useLocation()
  const { currentUser, user } = useCurrentUser()

  useEffect(() => {
    currentUser()
  }, [])
  return (
    <>
      <CurrentUserContext.Provider value={{ user }}>
        <Grid container>
          <Grid item xs={2}>
            {location.pathname !== '/login' ? (<>
              <Navbar />
            </>) : null}
          </Grid>
          <Grid item xs={10} p={2} mt={1.5}>
            <Routes>
              <Route path='/' element={<Navigate to={'/login'}/>}/>
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/create_product' element={<CreateProduct />} />
              <Route path='/stock' element={<Stocks />} />
              <Route path='/create_stock' element={<CreateStock />} />
              <Route path='/product/:id' element={<CurrentProduct />} />
              <Route path='/orders' element={<OrderPage />} />
              <Route path='/create_order' element={<CreateOrderPage />} />
              <Route path='/note' element={<Note />} />
              <Route path='/login' element={<Login />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/reports' element={<Report/>}/>
              <Route path='/stats' element={<Stats/>}/>
              <Route path={'admin_panel'} element={<AdminPanel/>}/>
              {/* <Route path='/orders' element={<Orders />} />
                <Route path='/reports' element={<Report />} />
                <Route path='/stock' element={<Stock />} /> 
                <Route path='/import' element={<Import />} />
                <Route path='/neworder' element={<NewOrder />} />
              <Route path='/admin' element={<Admin/>}/> */}
            </Routes>
          </Grid>
        </Grid>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
