import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovie/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpComingMovie/UpcomingMovieSlide'
//1. 배너 =>popular 영화를 들고와서 첫번째 아이템 보여주기
//2. popular movie
//3. top rated movie
//4. upcoming
const Homepage = () => {
  return (
    <div>
    <Banner></Banner>
    <PopularMovieSlide></PopularMovieSlide>
   <TopRatedMovieSlide></TopRatedMovieSlide>
   <UpcomingMovieSlide></UpcomingMovieSlide>
    </div>
  )
}

export default Homepage
