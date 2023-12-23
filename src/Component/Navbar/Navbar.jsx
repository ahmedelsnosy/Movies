import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Navbar.module.css'
export default function Navbar({ userData, logout }) {




    return <>
        <nav className={`${Style.navigation} navbar navbar-expand-lg shadow-lg fixed-top `}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><span className={Style.W}>W</span>e <span className={Style.C}>C</span>ima</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {userData?  <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5 ">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="">Home</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link active" to="movie">Movie</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="tv">Tv</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="people">People</Link>
                        </li>
                       
                    </ul>:""}
                  
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">



                        {userData ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout} >Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="profile">{`${userData.first_name} ${userData.last_name}`}</Link>
                                </li>
                               
                            </>
                            : <>
                            
                              <li className="text-dark nav-item d-flex align-items-center">
                            <i className='fab fa-facebook mx-2'></i>
                            <i className='fab fa-twitter mx-2'></i>
                            <i className='fab fa-tiktok mx-2'></i>
                            <i className='fab fa-youtube mx-2'></i>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="register">Register</Link>
                        </li>
                        <li className="nav-item">
                                    <Link className="nav-link active" to="login">Login</Link>
                                </li>
                              
                            
                            </>}
                      
                       


                    </ul>
                </div>
            </div>
        </nav>

    </>
}
