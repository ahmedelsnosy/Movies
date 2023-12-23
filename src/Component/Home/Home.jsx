import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Style from './Home.module.css'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
export default function Home() {


    const [movies, setmovies] = useState([])
    const [Tv, setTv] = useState([])
    const [People, setPeople] = useState([])


    async function getMovies(mediaType, func) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c53b1866ae5832ff68901dfb84dd810c`)

        func(data.results)
    }


    useEffect(() => {


        getMovies("movie", setmovies);
        getMovies("tv", setTv);
        getMovies("person", setPeople);
    }, [])





    return <>


        <Helmet>
            <meta name="description" content="Web site For movies" />
            <title>Home</title>
        </Helmet>

        
        {/* Movie */}
        <div className="row p-5 gy-4 gx-4 ">
            <div className="col-md-2 d-flex align-items-center">
                <h2 className={Style.watch}>
                    Watch trending
                    Movie
                </h2>
            </div>
            {movies.slice(0, 11).map((movie, index) =>
                <div className="col-md-2" key={index}>
                    <Link to={`/details/${movie.id}/${movie.media_type}`}>
                        <div className={`${Style.member}`}>
                            {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='' alt="" /> : ""}
                            <div className={`${Style.memberCaption}`}>
                                {movie.title ? <p>{movie.title}</p> : ""}
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
                    TV
                </h2>
            </div>
            {Tv.slice(0, 11).map((Tv, index) =>
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




        {/* Person */}
        <div className="row p-5 gy-4 gx-4 ">
            <div className="col-md-2 d-flex align-items-center">
                <h2 className={Style.watch}>
                    About trending
                    Person
                </h2>
            </div>
            {People.slice(0, 11).map((People, index) =>
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






    </>
}
