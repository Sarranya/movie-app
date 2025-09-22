import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import MovieDetail from './pages/Home/MovieDetail'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>

    </>
  )
}

export default App