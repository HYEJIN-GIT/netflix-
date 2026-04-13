import React from 'react'
import CarouselModule from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../MovieCard/MovieCard'
const Carousel = CarouselModule.default;


const MovieSlider = ({title,movies,responsive}) => {

    
  return (
    <div>
        <h3>{title}</h3>

<Carousel
  infinite={true}
  centerMode={true}
  itemClass='movie-slider- p-1'
  containerClass='carousel-container'
  responsive={responsive}
>

 {
 movies.map((movie,index)=>(
      <MovieCard movie={movie} key={index}></MovieCard>
  ))
}

</Carousel>
    </div>
  )
}

export default MovieSlider
