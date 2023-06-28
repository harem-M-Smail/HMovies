/* eslint-disable */
import { Link, useLoaderData } from "react-router-dom";
import About from "./About";

const EachMovie = () => {
  const { details, video, recomendations, review, creadits } =
    useLoaderData();
  // ,whatchProviders,review,creadits
  // geners
  const geners = [];
  details.genres.map((gener) => {
    geners.push(gener.name);
  });
  // original_language
  const originalLanguage = details.original_language;

  //overview
  const overview = details.overview;

  // spoken_languages
  const spokenLanguages = [];
  details.spoken_languages.map((s) => spokenLanguages.push(s.english_name));

  // cast
  const cast=[]
  creadits.cast.slice(0,3).map(person=>cast.push(person.original_name))

  let trailer;
  if (video.results.find((item) => item.type === "Trailer")) {
    trailer = video.results.find((item) => item.type === "Trailer");
  } else {
    trailer = video.results.slice(0, 1);
  }
  const reviews=review.results
  let productionCompaniesLogo=false
  details.production_companies.map(pCompany=>{
    if(pCompany.logo_path ){
      productionCompaniesLogo=true
    }
  })
  return (
    <div className="each-movie">
      <div className="each-movie-header-container">
        <div className="each-movie-img-container">
          <img
            className="each-movie-img"
            alt="movie-image"
            src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
          />
        </div>
        <div className="each-movie-info">
          <h1 className="each-movie-title">{details.title}</h1>
          <p className="each-movie-pilot">{overview}</p>
          <hr />
          <div className="row">
            <span>Genres: </span>
            <p>{geners.toString()}</p>
          </div>
          <div className="row">
            <span>Orignal language: </span>
            <p>{originalLanguage}</p>
          </div>
          <div className="row">
            <span>Spoken languages: </span>
            <p>{spokenLanguages.toString()}</p>
          </div>
          <div className="row">
            <span>Release date: </span>
            <p>{details.release_date.replaceAll("-", "/")}</p>
          </div>
          <div className="row">
            <span>Raiting: </span>
            <p>{details.vote_average}</p>
          </div>
          <div className="row">
            <span>Time: </span>
            {details.runtime && <p>{details.runtime} min</p>}
          </div>
          <div className="row">
            <span>Cast: </span>
            <p>{cast.toString()}</p>
          </div>
        </div>
      </div>
      <div className="trailer-container">
        <iframe
          className="trailer"
          src={`https://www.youtube.com/embed/${trailer.key}?controls=1&amp;autoplay=0`}
          frameBorder="0"
          width="100%"
          aspect-ratio="16:9"
          title="YouTube video player"
          allowFullScreen
          controls
        />
      </div>
      {productionCompaniesLogo && (
        <div className="production-companies-container">
          <h1>Production Companies</h1>
          <div className="production-companies">
            {details.production_companies.map(
              (company) =>
                company.logo_path && (
                  <img
                    className="production-companies-img"
                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                    alt="company_logo"
                    key={company.id}
                  />
                )
            )}
          </div>
        </div>
      )}
      {recomendations.results.length !== 0 && (
        <div className="recomends-container">
          <h1 >Recomends</h1>
          <div className="recomend-movies-scroll-container">
            {recomendations.results.map((movie) => (
              
              <Link
              to={"/title/" + movie.id}
              key={movie.id}
            >
              <img className="each-catagory-movie" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie_image"/>
            </Link>
            ))}
          </div>
        </div>
      )}
      { reviews.length!==0 &&
                  <div className="reviews-container">
                  <h1>Reviews</h1>
                  <div className="reviews-scroll-container">
                  {reviews.map((review) => (
                    <div className="each-review" key={review.id}>
                      <div className="each-review-header">
                        <img
                          src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                          alt="profile_img"
                        />
                        <h3>{review.author_details.name}</h3>
                      </div>
                      <p>{review.content}</p>
                    </div>
                  ))}
                </div>
                  </div>
      }
      <About />
    </div>
  );
};
export default EachMovie;
export const eachMovieLoader = async ({ params }) => {
  const id = params.id;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZmUxZmJlNDdmZjQyN2Q3YjYxZDZjMjM4ZjBmNyIsInN1YiI6IjY0OGZlMWQ0NDU3NjVkMDEwMDE2ZThhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TAQ6aunEoLDp70i-dwk1IULk4CGYomKqxFmnSJZcKh8",
    },
  };
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const reviewUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const recomendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
  const [
    detailsRes,
    videoRes,
    recomendationRes,
    reviewRes,
    creditsRes,
  ] = await Promise.all([
    fetch(detailsUrl, options),
    fetch(videoUrl, options),
    fetch(recomendationsUrl, options),
    fetch(reviewUrl, options),
    fetch(creditsUrl, options),
  ]);

  //assign values
  const details = await detailsRes.json();
  const video = await videoRes.json();
  const recomendations = await recomendationRes.json();
  const review = await reviewRes.json();
  const creadits = await creditsRes.json();

  //return them all

  return { details, video, recomendations, review, creadits };
};