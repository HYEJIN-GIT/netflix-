import React, { useState,useEffect } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'
const Paginate = ReactPaginate.default
const Movies = () => {
  const [query] = useSearchParams()
  const keyword = query.get('q')

  const [page, setPage] = useState(1)

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }
  useEffect(() => {
    setPage(1)
  }, [keyword])
  
  const { data, isLoading, isError } = useSearchMovieQuery(keyword, page)

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Error</h1>
  if (data?.results?.length === 0) {
    return <h3>검색 결과가 없습니다.</h3>
  }
  console.log("MovieCard:", MovieCard)
console.log("ReactPaginate:", ReactPaginate)
console.log("Col:", Col)

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}></Col>

        <Col lg={8} xs={12}>
          <Row>
            {data?.results?.map((movie) => (
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
            forcePage = {page-1}
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