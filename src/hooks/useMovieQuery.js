import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchMovies = (genre, page) => {
  return api.get(`/discover/movie?with_genres=${genre}&page=${page}&language='ko-KR'` )
}

export const useMoviesQuery = (genre, page) => {
  return useQuery({
    queryKey: ['movies', genre, page],
    queryFn: () => fetchMovies(genre, page),
    select: (result) => result.data
  })
}