import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Home/Home'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Movie from '../Movie/Movie'
import Tv from '../Tv/Tv'
import People from '../People/People'
import Notfound from '../Notfound/Notfound'

import {jwtDecode} from 'jwt-decode'
import Profile from '../Profile/Profile'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Details from '../Details/Details'
import SimilarDetails from '../SimilarDetails/SimilarDetails'





export default function App() {
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        saveUserData() 
      }
     
    }, [])//solve For Refresh
  
  
    
  const [userData, setuserData] = useState(null)

  function saveUserData() {
    let encodedData = localStorage.getItem("token")
    let decodedData = jwtDecode(encodedData)
    setuserData(decodedData)
    
  }//for save USer DAta

  function logout() {
    localStorage.removeItem("token")
    setuserData(null)
    return <Navigate to="/login"/>
  }//Logout


  


  let routers = createBrowserRouter([
    {
      path: "", element: <Layout userData={userData} logout={logout}  />, children: [
        { path:"register", element:  <Register />  },
        { path: "login", element:<Login saveUserData={saveUserData}/>},
        { index:true, element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Home /></ProtectedRoute> },
        { path: "movie", element:<ProtectedRoute saveUserData={saveUserData} userData={userData}> <Movie userData={userData} /></ProtectedRoute> },
        { path: "tv", element:<ProtectedRoute saveUserData={saveUserData} userData={userData}> <Tv userData={userData}/> </ProtectedRoute> },
        { path: "people", element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><People userData={userData}/></ProtectedRoute>  },
        { path: "profile", element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><Profile userData={userData} /></ProtectedRoute>  },
        { path: "details/:id/:media_type", element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><Details userData={userData} /></ProtectedRoute>  },
        { path: "similarDetails/:id/:media_type", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><SimilarDetails userData={userData} /></ProtectedRoute> },
        

        { path: "*", element: <Notfound /> },
        
        
   ]}
 ])
  
  return <>
  
    
    <RouterProvider router={routers}/>
  </>
}
