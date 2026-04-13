import React from 'react'
import { Alert } from 'react-bootstrap'
import "react-multi-carousel/lib/styles.css";
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import {responsive} from "../../../../constants/responsive"
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import './TopRatedMovieSlide.style.css'


const TopRatedMovieSlide = () => {
  
    
      const { data, isLoading, isError, error } = useTopRatedMoviesQuery()
    
      if (isLoading) return <h1>Loading....</h1>
      if (isError) return <Alert variant='danger'>{error.message}</Alert>
    
      return (
        <div className='top-area'>
    <MovieSlider title="Popular Movies" movies={data.results}
    responsive={responsive}
    ></MovieSlider>
        </div>
      )
    }


export default TopRatedMovieSlide
