import React from 'react'
import { Badge } from 'react-bootstrap'
import "./Movie.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'

const MovieCard = ({movie}) => {
  
 const {data:genreData} = useMovieGenreQuery()
 const showGenre = (genreIdList) => {
  if(!genreData) return []
  const genreNameList = genreIdList.map((id)=>{
   const genreObj =  genreData.find((genre)=>genre.id === id)
   return genreObj.name;
  })
  return genreNameList
 }

  return (
    <div style={{
        backgroundImage:"url("+`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path
  
        }`+")"
      }} className='movie-card'>
   
   <div className='over-lay'>
    <h2>{movie.title}</h2>
    {showGenre(movie.genre_ids)?.map((genre,index)=>(
        <Badge key={index}>{genre}</Badge>
    ))}
     <div>
    <div>⭐️ {Math.round(movie.vote_average*10)/10}</div>

    <p>{movie.adult?"19":"all"}</p>
   </div>
   </div>
  
    </div>
  )
}

export default MovieCard
