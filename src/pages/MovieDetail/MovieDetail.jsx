import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'


const MovieDetail = () => {
const {id} = useParams()


const {data} = useMovieDetailQuery(id)
console.log(data)

//id값을 받아서 이 값에 대한 무비 정보 가져오기!
// 어떻ㄱㅔ 넘겨줘야될지 생각해보기!



  return (
    <div>
    
   <img src={ `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data?.poster_path}`}></img>
  
   <h2>{data?.title}</h2>
   <p>{data?.genres.map((item)=>
<div>{item.name}</div>
)}</p>
<div>
  {data?.release_date
  }
</div>
<div>{data?.popularity}</div>
<div>{data?.overview

}</div>
    </div>
  )
}

export default MovieDetail
