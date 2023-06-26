import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Geners = ({genres}) => {
  return (
    <>
      <div className="dropdown">
        <Link className="nav-links dropbtn">Genres</Link>
        <div className="dropdown-content">
          {genres.map((genre) => (
            <NavLink
              key={genre.id}
              to={
                `title/viewMore/${genre.id}/1`
                // "title/viewMore/list=most_pop_series&info=custom_info&genre=" +
                // genre +
                // "&limit=24&sort=year.decr&page=2"
              }
            >
              {genre.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
const Navbar = ({genres}) => {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZmUxZmJlNDdmZjQyN2Q3YjYxZDZjMjM4ZjBmNyIsInN1YiI6IjY0OGZlMWQ0NDU3NjVkMDEwMDE2ZThhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TAQ6aunEoLDp70i-dwk1IULk4CGYomKqxFmnSJZcKh8",
      },
    };
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .then((data) => setFound(data.results))
        .catch((err) => console.error(err));
    }else{
      setFound([])
    }
  }, [query]);
  const Nav = useNavigate();
  const chooseMovie = (movie) => {
    Nav("title/" + movie.id);
    setFound([])
    setQuery("")
  };
  const filteredFound=found.filter(movie=>movie.poster_path) 
  return (
    <div className="navbar">
      <Link className="nav-links" to="/">
        <span className="blacktitle">H</span>
        <span className="whitetitle">Movies</span>
      </Link>
      <Link className="nav-links" to="/">
        Home
      </Link>
      <Geners className="nav-links" genres={genres} />
      <input
        className="nav-input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
        <div className="found-movies-container">
          {found.length !== 0 && (
            <>
            {filteredFound.map((movie) => (
              <div className="each-found-movie" key={movie.id} onClick={() => chooseMovie(movie)}>
                <img width={"35px"} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/>
                <div className="each-found-movie-content">
                <h4>{movie.title}</h4>
                <BsFillStarFill style={{fontSize:"11px",marginRight:"2px"}}/>
                <span>{movie.vote_average}</span>
                </div>
              </div>
              
          ))}
            </>
          )
          
          
          }
          
        </div>
    </div>
  );
};
export default Navbar;