import React, { useState, useEffect } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'
import { BeatLoader } from 'react-spinners'
import { useMovieSortQuery } from '../../hooks/useMovieSortQuery'

const Paginate = ReactPaginate.default

const Movies = () => {
  const [query] = useSearchParams()
  const keyword = query.get('q')

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popular')

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }

  useEffect(() => {
    setPage(1)
  }, [keyword, sort]) 

  const { data, isLoading, isError } = useSearchMovieQuery(keyword, page)
  const { data: sortData } = useMovieSortQuery(sort, page)

  if (isLoading) return <BeatLoader />
  if (isError) return <h1>Error</h1>


  const movieList = keyword ? data?.results : sortData?.results


  const totalPages = keyword
    ? data?.total_pages
    : sortData?.total_pages

  if (movieList?.length === 0) {
    return <h3>검색 결과가 없습니다.</h3>
  }

  return (
    <Container>
      <Row>

        <Col lg={4} xs={12}>
          <Row>
            <Col>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="popular">인기순</option>
                <option value="top_rated">평점순</option>
                <option value="now_playing">현재 상영중</option>
                <option value="upcoming">개봉 예정</option>
              </select>
            </Col>
          </Row>
        </Col>

      
        <Col lg={8} xs={12}>
          <Row>
            {movieList?.map((movie) => (
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
            pageCount={totalPages || 1}
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