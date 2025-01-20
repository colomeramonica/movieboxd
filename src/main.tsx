import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      {/* <Route index element={<Login />} /> */}
    </Routes>
  </BrowserRouter>
)
