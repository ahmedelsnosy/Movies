import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
export default function Layout({ userData, logout }) {
    
    return <>
    
        <Navbar userData={userData} logout={logout} />
        <div className="container-fluid my-4 p-4">
            <div className="p-5 my-5">

        <Outlet></Outlet>
            </div>
        </div>

        

        <footer className='text-center'>
            <span>&copy; All Rights For Ahmed Elsnosy 2023</span>
        </footer>
    
    </>
}
