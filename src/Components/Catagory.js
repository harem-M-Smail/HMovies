import { Link } from "react-router-dom"

const Catagory=({title,data,catagory})=>{
    const movies = data
    return (
      <div className="pc">
        <h1 className="catagory-title">{title}</h1>
        <div className="catagory">
          {movies.results.slice(0,12).map((movie) => (
            <Link
              to={"/title/" + movie.id}
              key={movie.id}
            >
              <img className="each-catagory-movie" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie_image"/>
            </Link>
          ))}
        </div>
        {/* <Link className="view-more-link" to={`title/viewMore/${catagory}/1`}>View More</Link> */}
      </div>
    );
}
export default Catagory