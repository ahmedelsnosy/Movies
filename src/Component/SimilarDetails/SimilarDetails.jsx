import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Style from './SimilarDetails.module.css'
import Helmet from 'react-helmet'
export default function SimilarDetails() {





    let params = useParams()
    const [movieDetails, setmovieDetails] = useState([])
    const [SimilarMovies, setSimilarMovies] = useState([])
    const [genres, setgenres] = useState([])
    async function MovieDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=c53b1866ae5832ff68901dfb84dd810c`)
        setmovieDetails(data)
        setgenres(data.genres)
    }




    async function getSimilarMovies() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar?api_key=c53b1866ae5832ff68901dfb84dd810c`)
        setSimilarMovies(data.results)

    }

    useEffect(() => {

        MovieDetails()
        if (params.media_type === "person") {

            return false
        }
        else {

            getSimilarMovies()
        }


    }, [])









    return <>

        <Helmet>
            <meta name="description" content="Web site For movies" />
            <title>Similar Movies</title>

        </Helmet>

        <div className="container">
            <div className="row">
                <div className='col-md-4 '>
                    <div className='position-relative'>
                        {movieDetails.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} className='w-100' alt="movie" /> : <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.profile_path}`} className='w-100' alt="" />}
                        <div className='vote_average position-absolute top-0 end-0'>
                            {movieDetails.vote_average ? <h5 className={Style.vote}>{movieDetails.vote_average?.toFixed(1)}</h5> : ""}

                        </div>
                    </div>

                </div>
                <div className="col-md-8 my-2">
                    <h3>{movieDetails.title}</h3>
                    <h3>{movieDetails.name}</h3>
                    {movieDetails.overview ? <p className='text-text-muted'>{movieDetails.overview}</p> : <p className='text-text-muted'>{movieDetails.biography}</p>}

                    <span>popularity is :{movieDetails.popularity?.toFixed(1)}</span>
                    <br />
                    <br />

                    {movieDetails.birthday ? <span className={Style.Date}>birth Date is :{movieDetails.birthday}</span> : ""}

                    <div className="genres my-5">
                        {genres?.map((genres) =>
                            <span className='p-2 mx-2   bg-danger'>{genres.name}</span>
                        )}
                        <br />
                        <br />
                        {movieDetails.homepage !== null ? <a href={movieDetails.homepage} target="_blank"><button className={Style.Trailer}>Trailer</button></a> : ""}

                    </div>
                </div>
            </div>




            <div className="row p-5 gy-4 gx-4 ">
                {SimilarMovies.map((movie, index) =>
                    <div className="col-md-2" key={index}>
                        <Link to={`/details/${movie.id}/${params.media_type}`}>
                            <div className={`${Style.member}`}>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='w-100' alt="" />
                                <div className={`${Style.memberCaption}`}>
                                    <p>{movie.title}</p>
                                    <p>{movie.name}</p>

                                    {movie.vote_average ? <div className={Style.rate}>

                                        <span>{movie.vote_average.toFixed(1)}</span>
                                    </div> : ""}

                                </div>

                            </div>
                        </Link>
                    </div>


                )}
            </div>

        </div>





    </>
}
