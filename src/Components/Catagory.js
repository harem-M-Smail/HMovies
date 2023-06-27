import { Link } from "react-router-dom"

const Catagory=({title,data})=>{
    const movies = data
    console.log(data)
    // const next= data.next.slice(8).replace("limit=12","limit=24")
    // console.log(next)
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
        {/* <Link className="view-more-link" to={`title/viewMore/next`}>View More</Link> */}
      </div>
    );
}
export default Catagory