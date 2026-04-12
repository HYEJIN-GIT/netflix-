import React from 'react'
import { Badge } from 'react-bootstrap'
import "./Movie.style.css"

const MovieCard = ({movie}) => {
  
  const genreMap = {
    28: "액션",
    12: "모험",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    99: "다큐멘터리",
    18: "드라마",
    10751: "가족",
    14: "판타지",
    36: "역사",
    27: "공포",
    10402: "음악",
    9648: "미스터리",
    10749: "로맨스",
    878: "SF",
    10770: "TV 영화",
    53: "스릴러",
    10752: "전쟁",
    37: "서부"
  };

  return (
    <div style={{
        backgroundImage:"url("+`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path
  
        }`+")"
      }} className='movie-card'>
   
   <div className='over-lay'>
    <h2>{movie.title}</h2>
    {movie.genre_ids.map((id)=>(
        <Badge>{genreMap[id]}</Badge>
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
