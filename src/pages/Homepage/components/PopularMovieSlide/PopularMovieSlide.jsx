import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import CarouselModule from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Alert } from 'react-bootstrap'
import './PopularMovieSlide.style.css'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import {responsive} from "../../../../constants/responsive"
const Carousel = CarouselModule.default;

const PopularMovieSlide = () => {



  const { data, isLoading, isError, error } = usePopularMoviesQuery()

  if (isLoading) return <h1>Loading....</h1>
  if (isError) return <Alert variant='danger'>{error.message}</Alert>

  return (
    <div className='popular-area'>
    <MovieSlider title="Popular Movies" movies={data.results}
    responsive={responsive}
    ></MovieSlider>
    </div>
  )
}

export default PopularMovieSlide