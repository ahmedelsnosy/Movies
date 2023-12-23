import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Style from './Tv.module.css'

import { Link } from 'react-router-dom'
import PagenationTv from '../PagenationTv/PagenationTv'
export default function Tv() {
  
  const [Tv, setTv] = useState([])
  const [searchTv, setsearchTv] = useState([])
  
  
  async function getMovies(mediaType, func) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=c53b1866ae5832ff68901dfb84dd810c`)

    setTv(data.results)
  }
  
  async function Search(word) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c53b1866ae5832ff68901dfb84dd810c&query=${word}`)
    setsearchTv(data.results)
  }
  async function getPageTv(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=c53b1866ae5832ff68901dfb84dd810c&page=${page}`)

    setTv(data.results)
  }
  
  useEffect(() => {


    getMovies();
  }, [])
  
  
  
  
  
  return <>
  
    <div className="container my-5">
      <input onChange={(e) => Search(e.target.value)} type="text" className='form-control' name='search' placeholder='Seacrh By Name' />
    </div>
  
    <div className="row p-5 gy-4 gx-4 ">
      {searchTv.map((Tv, index) =>
        <div className="col-md-2" key={index}>
          <Link to={`/details/${Tv.id}/tv`}>
            <div className={`${Style.member}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${Tv.poster_path}`} className='' alt="" />


              <div className={`${Style.memberCaption}`}>
                <p>{Tv.name}</p>
                <div className={Style.rate}>
                  <span>{Tv.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>


        </div>

      )}


    </div>
    <div className="row p-5 gy-4 gx-4 ">
      <div className="col-md-2 d-flex align-items-center">
        <h2 className={Style.watch}>
          Watch trending
          TV
        </h2>
      </div>
      {Tv.map((Tv, index) =>
        <div className="col-md-2" key={index}>
          <Link to={`/details/${Tv.id}/${Tv.media_type}`}>
            <div className={`${Style.member}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${Tv.poster_path}`} className='' alt="" />


              <div className={`${Style.memberCaption}`}>
                <p>{Tv.name}</p>
                <div className={Style.rate}>
                  <span>{Tv.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>


        </div>

      )}


    </div>



    <PagenationTv getPageTv={getPageTv}/>
  </>
}
