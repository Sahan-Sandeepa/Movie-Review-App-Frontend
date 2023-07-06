import './App.css';
import api from './Api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import axios from "axios";

function App() {

  const [movies, setMovie] = useState([]);

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
  useEffect(() => getMovies(), []);

  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}></Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
