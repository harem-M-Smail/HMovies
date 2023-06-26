import { useLoaderData } from "react-router-dom"
import Catagory from "./Catagory"
import About from "./About"
const Home=()=>{
    const {nowPlaying, mostPopMovies,topRatedMovies,upcomingMovies}=useLoaderData()
    return(
        <>
        <div className="home">
            <Catagory title="Most Popular" data={mostPopMovies} />
            <Catagory title="Now Playing" data={nowPlaying} />
            <Catagory title="Top Rated" data={topRatedMovies} />
            <Catagory title="Upcoming" data={upcomingMovies} />
        </div>
        <About/>
        </>   
    )
}
export default Home
export const homeLoader=async ()=>{

  // tmdb

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZmUxZmJlNDdmZjQyN2Q3YjYxZDZjMjM4ZjBmNyIsInN1YiI6IjY0OGZlMWQ0NDU3NjVkMDEwMDE2ZThhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TAQ6aunEoLDp70i-dwk1IULk4CGYomKqxFmnSJZcKh8'
    }
  };
  // tmdb
    // endpoints
  const mostPopMoviesUrl='https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
  const nowPlayingUrl='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2'
  const topRatedUrl='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=3'
  const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=4'

    
    // fetch
  const [nowPlayingRes, mostPopMoviesRes,topRatedRes,upcomingRes] = await Promise.all([
    fetch(nowPlayingUrl,options),
    fetch(mostPopMoviesUrl,options),
    fetch(topRatedUrl,options),
    fetch(upcomingUrl,options),
    // fetch(newsUrl,newsOptions)
  ]);
   
  //assign values
  const nowPlaying = await nowPlayingRes.json();
  const mostPopMovies = await mostPopMoviesRes.json();
  const topRatedMovies = await topRatedRes.json();
  const upcomingMovies= await upcomingRes.json();
//   const news=await newsRes.json()
    
  //return them all
  return {nowPlaying, mostPopMovies,topRatedMovies,upcomingMovies};
}