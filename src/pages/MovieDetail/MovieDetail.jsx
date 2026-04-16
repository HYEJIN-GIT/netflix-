import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import './MovieDetail.style.css'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviewsQuery'
import { useMovieVideoQuery } from '../../hooks/useMovieVideoQuery'

const MovieDetail = () => {
  const { id } = useParams()
  const { data } = useMovieDetailQuery(id)
  const {data:review} = useMovieReviewsQuery(id)
  const {data : video} = useMovieVideoQuery(id)
 
const trailer = video?.find((item)=> item.type === "Trailer")
console.log(trailer )
  

  return (
    <>
    <div
      className="movie-wrapper"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`
      }}
    >
      <div className="overlay" />
  
      <div className="content">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data?.poster_path}`}
          alt={data?.title}
        />
  
        <div className="details">
          <h1>{data?.title}</h1>
  
          <div className="badges">
            {data?.genres?.map((item) => (
              <span key={item.id}>{item.name}</span>
            ))}
          </div>
  
          <div className="meta">
            <span>{data?.release_date}</span>
            <span>{data?.popularity}</span>
            <span>{Math.round(data?.vote_average * 10) / 10}</span>
          </div>
  
          <p className="overview">{data?.overview}</p>
        </div>
      </div>
    </div>
    <div className="video-area" >
     
          <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailer?.key}`}
          title="trailer"
          allowFullScreen
        />
      
    
   
    </div>

    <div className="review-section">
      <h2>Reviews</h2>
  
      {review?.length === 0 ? (

<div className="review-card">

<p>아직 리뷰가 없습니다.</p>
</div>

      
      ) : (
        review?.map((item) => (
          <div className="review-card" key={item.id}>
            <h4>{item.author}</h4>
            <p>{item.content}</p>
          </div>
        ))
      )}
    </div>

  
  </>
  )
}

export default MovieDetail