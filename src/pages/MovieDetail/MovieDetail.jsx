import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import './MovieDetail.style.css'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviewsQuery'
import { useMovieVideoQuery } from '../../hooks/useMovieVideoQuery'
import { BeatLoader } from 'react-spinners'
import { Alert } from 'bootstrap'
const MovieDetail = () => {
  const { id } = useParams()
  const { data,isLoading,isError,error } = useMovieDetailQuery(id)
  const {data:review} = useMovieReviewsQuery(id)
  const {data : video} = useMovieVideoQuery(id)
  const [openId, setOpenId]= useState(null)
const trailer = video?.find((item)=> item.type === "Trailer")


if(isLoading){
  return  <BeatLoader size={15} color="white"></BeatLoader>
  }
  if(isError){
    return   <Alert variant='danger'>{error.message}</Alert>
  }

  console.log(review)
  
  const toggle=(id)=>{
    setOpenId(prev => (prev === id ? null : id))

  }

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
            <span> Release Date {data?.release_date}</span>
           
          </div>
  
          <p className="overview">{data?.overview}</p>
          <div className='movie-info'>
            <div>Budget {data?.budget}</div>
            <div>popularity {data?.popularity}</div>
            <div>vote_average {Math.round(data?.vote_average * 10) / 10}</div>
          </div>
         
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
            <p> {openId === item.id
    ? item.content
    : item.content.slice(0, 100)}</p>
           <button  onClick={()=>toggle(item.id)}>{
            openId === item.id?
            "접기" : "더보기"
            
            }</button>
            
          </div>
        ))
      )}
    </div>

  
  </>
  )
}

export default MovieDetail