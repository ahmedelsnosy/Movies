import React from 'react'
import Helmet from 'react-helmet'
export default function Profile({userData}) {
    let {first_name,last_name,age,email}=userData
    
    return <>

        <Helmet>
            <meta name="description" content="Web site For movies" />
            <title>Profile</title>

        </Helmet>
        <div className="container text-white text-center">
            
            <h1>{ first_name}</h1>
            <h1>{ last_name}</h1>
            <h1>{ age}</h1>
            <h1>{ email}</h1>
    </div>
    
    </>
}
