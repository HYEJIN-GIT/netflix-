
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

  const genres = [
    { id: 28, name: "액션" },
    { id: 12, name: "모험" },
    { id: 16, name: "애니메이션" },
    { id: 35, name: "코미디" },
    { id: 80, name: "범죄" },
    { id: 99, name: "다큐멘터리" },
    { id: 18, name: "드라마" },
    { id: 14, name: "판타지" },
    { id: 27, name: "공포" },
    { id: 10749, name: "로맨스" },
    { id: 878, name: "SF" },
    { id: 53, name: "스릴러" }
  ]

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

  if (isLoading) return <div className="text-center mt-5"><BeatLoader /></div>
  if (isError) return <h1 className="text-center mt-5">Error</h1>

  return (
    <Container className="movie-page">
      <Row>

       
        <Col xs={12} className="mb-3">
          <Row className="filter-row">
            <Col xs={6}>
              <DropdownButton title="정렬" className="w-100">
                <Dropdown.Item onClick={() => setSortBy('desc')}>
                  인기순
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('rating')}>
                  평점 높은 순
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('latest')}>
                  최신순
                </Dropdown.Item>
              </DropdownButton>
            </Col>

            <Col xs={6}>
              <DropdownButton title="장르" className="w-100">
                <Dropdown.Item onClick={() => setGenre(null)}>
                  전체
                </Dropdown.Item>
                {genres.map((g) => (
                  <Dropdown.Item
                    key={g.id}
                    onClick={() => setGenre(g.id)}
                  >
                    {g.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
        </Col>

      
        <Col xs={12}>
          <Row>
            {processedList.map(movie => (
              <Col key={movie.id} xs={6} sm={4} md={3} lg={4} className="mb-3">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

         
          <Paginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={data?.total_pages || 1}
            forcePage={page - 1}
            containerClassName="pagination justify-content-center mt-4"
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

