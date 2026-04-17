import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';



const fetchMovieSort = (sort,page) => {
    return api.get(`/movie/${sort}?language=ko-KR&page=${page}`);
  };
export const useMovieSortQuery = (sort,page)=>{
         return useQuery({
            queryKey: ['movie-sort',sort,page],
            queryFn: () => fetchMovieSort(sort,page),
            select: (result) => result.data,
            
           
          });
}
