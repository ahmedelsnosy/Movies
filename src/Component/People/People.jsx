import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Style from './People.module.css'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import PagenationPeople from '../PagenationPeople/PagenationPeople'
export default function People() {



  const [People, setPeople] = useState([])
  const [searchPeople, setsearchPeople] = useState([])


  async function getPepole() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=c53b1866ae5832ff68901dfb84dd810c&page=1`)

    setPeople(data.results)
  }

  async function getPagePeople(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=c53b1866ae5832ff68901dfb84dd810c&page=${page}`)
    setPeople(data.results)
  }


  async function SearchForPerson(word) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=c53b1866ae5832ff68901dfb84dd810c&query=${word}`)
    setsearchPeople(data.results)
  }
  useEffect(() => {


    getPepole();
  }, [])

  return <>

    <Helmet>
      <meta name="description" content="Web site For movies" />
      <title>Persons</title>

    </Helmet>
    <div className="container my-5">
      <input type="text" className='form-control' name='search' placeholder='Search By Name' onChange={(e)=>SearchForPerson(e.target.value)}/>
    </div>
  
    <div className="row p-5 gy-4 gx-4 ">
      {searchPeople.map((People, index) =>
        <div className="col-md-2" key={index}>
          <Link to={`/details/${People.id}/${People.media_type}`}>
            <div className={`${Style.member}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${People.profile_path}`} className='' alt="" />
              <div className={`${Style.memberCaption}`}>
                <p>{People.name}</p>
              </div>
            </div>

          </Link>


        </div>

      )}


    </div>
    <div className="row p-5 gy-4 gx-4 ">
      <div className="col-md-2 d-flex align-items-center">
        <h2 className={Style.watch}>
          About trending
          Person
        </h2>
      </div>
      {People.map((People, index) =>
        <div className="col-md-2" key={index}>
          <Link to={`/details/${People.id}/${People.media_type}`}>
            <div className={`${Style.member}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${People.profile_path}`} className='' alt="" />
              <div className={`${Style.memberCaption}`}>
                <p>{People.name}</p>
              </div>
            </div>

          </Link>


        </div>

      )}


    </div>

    <PagenationPeople getPagePeople={getPagePeople}/>
  </>
}
