import React from 'react'
import { Alert } from 'react-bootstrap'
import "react-multi-carousel/lib/styles.css";
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovie';
import './UpcomingMovieSlide.style.css'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import {responsive} from "../../../../constants/responsive"



const UpcomingMovieSlide = () => {
  
    
      const { data, isLoading, isError, error } =  useUpcomingMoviesQuery()
    
      if (isLoading) return 
      if (isError) return <Alert variant='danger'>{error.message}</Alert>
    
      return (
        <div className='upcoming-area'>
      <MovieSlider title="Upcoming Movies" movies={data.results}
    responsive={responsive}
    ></MovieSlider>
        </div>
      )
    }
export default UpcomingMovieSlide
