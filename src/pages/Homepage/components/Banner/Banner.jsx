import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'react-bootstrap'
import "./Banner.style.css"
import { BeatLoader } from "react-spinners"
const Banner = () => {
    const {data,isLoading,isError,error} = usePopularMoviesQuery()
    console.log(data)
    if(isLoading){
    return  <BeatLoader size={15} color="white"></BeatLoader>
    }
    if(isError){
      return   <Alert variant='danger'>{error.message}</Alert>
    }
  return (
    <div style={{
      backgroundImage:"url("+`https://image.tmdb.org/t/p/w1066_and_h600_bestv2/${data?.results[3].backdrop_path

      }`+")"
    }} className='banner'>
      <div className='banner-text-area'>
       
        <h1>{data?.results[3].title}</h1>
        <p>{data?.results[3].overview}</p>
      </div>
    </div>
  )
}

export default Banner
