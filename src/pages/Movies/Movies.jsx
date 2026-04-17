import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'
import { BeatLoader } from 'react-spinners'

import { useSearchMovieQuery } from '../../hooks/useSearchMovies'

const Paginate = ReactPaginate.default

const Movies = () => {
  const [query] = useSearchParams()
  const keyword = query.get('q')

  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('popular') 
  const [genre, setGenre] = useState(null)

  const { data, isLoading, isError } = useSearchMovieQuery(keyword, page)

  
  useEffect(() => {
    setPage(1)
  }, [keyword, sortBy, genre])

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }

  
  const processedList = useMemo(() => {
    let list = [...(data?.results || [])]

    
    if (genre) {
      list = list.filter(movie =>
        movie.genre_ids?.includes(genre)
      )
    }

    
    if (sortBy === 'desc') {
      list.sort((a, b) => b.popularity - a.popularity)
    }

    if (sortBy === 'asc') {
      list.sort((a, b) => a.popularity - b.popularity)
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.vote_average - a.vote_average)
    }

    if (sortBy === 'latest') {
      list.sort(
        (a, b) =>
          new Date(b.release_date) - new Date(a.release_date)
      )
    }

    return list
  }, [data, genre, sortBy])

  if (isLoading) return <BeatLoader />
  if (isError) return <h1>Error</h1>

  return (
    <Container className="movie-page">
      <Row>

       
        <Col lg={4} xs={12}  className="movie-card-col">
          <Row className="filter-row">

           
            <Col>
              <DropdownButton title="정렬">
                <Dropdown.Item onClick={() => setSortBy('desc')}>
                  인기순 (내림차순)
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setSortBy('asc')}>
                  인기순 (오름차순)
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setSortBy('rating')}>
                  평점 높은 순
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setSortBy('latest')}>
                  최신순
                </Dropdown.Item>
              </DropdownButton>
            </Col>

            {/* 장르 */}
            <Col>
              <DropdownButton title="장르">
                <Dropdown.Item onClick={() => setGenre(null)}>
                  전체
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setGenre(28)}>
                  액션
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setGenre(35)}>
                  코미디
                </Dropdown.Item>

                <Dropdown.Item onClick={() => setGenre(18)}>
                  드라마
                </Dropdown.Item>
              </DropdownButton>
            </Col>

          </Row>
        </Col>

       
        <Col lg={8} xs={12} >
          <Row>
            {processedList.map(movie => (
              <Col key={movie.id} lg={4}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          <Paginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={data?.total_pages || 1}
            forcePage={page - 1}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </Col>

      </Row>
    </Container>
  )
}

export default Movies