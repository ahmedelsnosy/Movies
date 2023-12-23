import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Style from './Movie.module.css'
import Helmet from 'react-helmet'
import Pagenation from '../Pagenation/Pagenation'
export default function Movie() {
  
  
  
  const [movies, setmovies] = useState([])
  const [movieBySearch, setmovieBySearch] = useState([])

  
  
  async function getMovies() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=c53b1866ae5832ff68901dfb84dd810c&page=1`)

    setmovies(data.results)
  }


  async function getPage(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=c53b1866ae5832ff68901dfb84dd810c&page=${page}`)

    setmovies(data.results)
  }
  


  async function Search(word) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c53b1866ae5832ff68901dfb84dd810c&query=${word}`)
    setmovieBySearch(data.results)
  }
  useEffect(() => {


    getMovies();
    
  }, [])
  return <>

    <Helmet>
      <meta name="description" content="Web site For movies" />
      <title>Movies</title>

    </Helmet>
    <div className="container my-5">
      <input onChange={(e)=> Search(e.target.value)} type="text" className='form-control' name='search' placeholder='Seacrh By Name' />
    </div>



    <div className="row p-5 gy-4 gx-4 ">
      {movieBySearch.map((movie, index) =>
        <div className="col-md-2" key={index}>
          <Link to={`/details/${movie.id}/movie`}>
            <div className={`${Style.member}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='' alt="" />
              <div className={`${Style.memberCaption}`}>
                <p>{movie.title}</p>
                <div className={Style.rate}>
                  <span>{movie.vote_average.toFixed(1)}</span>
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
          Movie
        </h2>
      </div>
      {movies.map((movie, index) =>
        <div className="col-md-2" key={index}>
          <Link to={`/details/${movie.id}/${movie.media_type}`}>
            <div className={`${Style.member}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='' alt="" />
              <div className={`${Style.memberCaption}`}>
                <p>{movie.title}</p>
                <div className={Style.rate}>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

            </div>
          </Link>
        </div>


      )}
    </div>
  
    <Pagenation getPage={getPage}/>
  </>
}
