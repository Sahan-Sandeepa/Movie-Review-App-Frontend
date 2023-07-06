import './App.css';
import api from './Api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import axios from "axios";
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
// import NotFound from './components/notFound/NotFound';
import Reviews from './components/reviews/Reviews';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = () => {

    // try{
    //    const response = await get("/api/v1/movies");
    //    setMovie(response);
    // }
    // catch(err){
    //   console.log(err);
    // }

    axios
      .get("http://localhost:8080/api/v1/movies")
      .then((res) => {
        setMovie(res.data);
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });


  }
  const getMovieData = (movieId) => {

    // try {
    //   const response =axios
    //   .get(`http://localhost:8080/api/v1/movies/${movieId}`);

    //   const singleMovie = response.data;

    //   setMovie(singleMovie);

    //   setReviews(singleMovie.reviews);


    // }
    // catch (error) {
    //   console.error(error);
    // }

    axios
      .get(`http://localhost:8080/api/v1/movies/${movieId}`)
      .then((res) => {
        setMovie(res.data);
        setReviews(res.data.reviews)
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Route>
      </Routes>

    </div>
  );
}

export default App;
