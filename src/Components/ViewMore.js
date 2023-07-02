
/* eslint-disable */import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
// material ui imports
import * as React from 'react';
import Pagination from '@mui/material/Pagination';

const ViewMore=()=>{
    const query=useLocation().pathname.split("/")[3]
    const nav=useNavigate()
    const data=useLoaderData()
    const movies=data.results.slice(0,18)
    
    return(
   <>
            <div className="view-more">
                <div className="pm">
                    <div className="catagory">
                    {movies.map((movie) => (
                        <Link
                        className="each-catagory-movie"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }}
                        to={"/title/" + movie.id}
                        key={movie.id}
                        ></Link>
                    ))}
                    </div>
                </div>
                <div className="pagination-div">
                     <Pagination className="pagination"  count={10}  onChange={(e,page)=>nav(`/title/viewMore/${query}/${page}`)} />
                </div>
            </div>
        </>
    )
}
export default ViewMore
export const viewMoreLoader= async ({params})=>{
    const query=params.query
    const page=params.page
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZmUxZmJlNDdmZjQyN2Q3YjYxZDZjMjM4ZjBmNyIsInN1YiI6IjY0OGZlMWQ0NDU3NjVkMDEwMDE2ZThhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TAQ6aunEoLDp70i-dwk1IULk4CGYomKqxFmnSJZcKh8'
        }
      };
    const genreUrl=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${query}`
    const res= await fetch(genreUrl,options)
    if(!res.ok){
        throw new Error("couldnot fetch view more movies")
    }
    const data= await res.json()
    return data
}