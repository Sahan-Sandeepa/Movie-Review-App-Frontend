import './App.css';
import api from './Api/axiosConfig';
import { useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes ,Route } from 'react-router-dom';
import Home from './components/home/Home';

function App() {

  const [movies, setMovie] = useState();

  const getMovies = async () => {
   
    try{
       const response = await api.get("/api/v1/movies");
       setMovie(response);
    }
    catch(err){
      console.log(err);
    }

  }

  useEffect(() => {getMovies();},[])
  return (
    <div className="App">
      <Routes>
      
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home movies={movies}/>}></Route>
      </Route>

      </Routes>      
    </div>
  );
}

export default App;
