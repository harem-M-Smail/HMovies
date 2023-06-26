import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
// material ui imports
import * as React from 'react';
import Pagination from '@mui/material/Pagination';

const ViewMore=()=>{
    const generId=useLocation().pathname.split("/")[3]
    const nav=useNavigate()
    const data=useLoaderData()
    const movies=data.results.slice(0,18)
    console.log(data)
    // get moview title from the nextPage url 
    // const regex = /list=([^&]+)/;
    // const title = data.next.match(regex)?.[1].replace(/_/g, " ");
    return(
   <>
            {/* <h1>{title}</h1> */}
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
                     <Pagination className="pagination"  count={10}  onChange={(e,page)=>nav(`/title/viewMore/${generId}/${page}`)} />
                     {/* {/* ${data.next.slice(8).replace(/page=\d+/, `page=${page+1}`)} */}
                </div>
            </div>
        </>
    )
}
export default ViewMore
export const viewMoreLoader= async ({params})=>{
    const genre=params.genre
    const page=params.page
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZmUxZmJlNDdmZjQyN2Q3YjYxZDZjMjM4ZjBmNyIsInN1YiI6IjY0OGZlMWQ0NDU3NjVkMDEwMDE2ZThhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TAQ6aunEoLDp70i-dwk1IULk4CGYomKqxFmnSJZcKh8'
        }
      };
    const newUrl=`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`
    const res= await fetch(newUrl,options)
    if(!res.ok){
        throw new Error("couldnot fetch view more movies")
    }
    const data= await res.json()
    return data
}