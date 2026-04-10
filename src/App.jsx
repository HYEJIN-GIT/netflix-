import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Route,Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Homepage from './pages/Homepage/Homepage'
import Movies from './pages/Movies/Movies'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

//홈페이지 /
//영화 전체 보여주는 페이지(서치) /movies
//영화 디테일 페이지 /movies /:id

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<AppLayout></AppLayout>}>
        <Route index element = {<Homepage></Homepage>}></Route> 
        <Route path="movies">
        <Route index element={<Movies></Movies>}></Route>
          <Route path=':id' element={<MovieDetail></MovieDetail>}></Route>
        </Route>

        {/* <Route path='/movies' element = {<Movies></Movies>}></Route> 
        <Route path='/movies/:id' element = {<MovieDetail></MovieDetail>}></Route>  */}
      
      </Route>
      <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
    </>
  )
}

export default App
