import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './components/Navbar.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

const App = () => {
  return (
    <>
    <AuthContextProvider>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
    </Routes>
    </AuthContextProvider>
    </>
  )
}

export default App