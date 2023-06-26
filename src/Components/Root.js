import { Outlet } from "react-router"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { useLocation,useLoaderData } from "react-router-dom";
import { BsArrowUpCircleFill } from "react-icons/bs";

const Root=()=>{
  const data=useLoaderData()
  const genres=data.genres
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, [pathname]);
    const scrollUp=()=>{
        window.scrollTo({top:"0",behavior:"smooth"})
    }
    const [backToTopButton,setBackToTopButton]=useState(false)
        window.addEventListener("scroll",()=>{
            if(window.scrollY>2000){
                setBackToTopButton(true)
            }else{
                setBackToTopButton(false)
            }
        },[])
    return (
      <>
        <Navbar genres={genres} />
        <main>
          <Outlet />
          {backToTopButton && (
            <BsArrowUpCircleFill
              className="back-to-top-btn"
              onClick={scrollUp}
            />
          )}
        </main>
      </>
    );
}
export default Root
export const rootLoader=async()=>{
  const url='https://api.themoviedb.org/3/genre/movie/list?language=en'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGJhZmUxZmJlNDdmZjQyN2Q3YjYxZDZjMjM4ZjBmNyIsInN1YiI6IjY0OGZlMWQ0NDU3NjVkMDEwMDE2ZThhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TAQ6aunEoLDp70i-dwk1IULk4CGYomKqxFmnSJZcKh8'
    }
  };
  
  const res = await fetch(url,options)
  const geners= await res.json()
  return geners
}