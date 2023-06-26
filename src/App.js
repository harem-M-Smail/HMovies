import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Root, { rootLoader } from './Components/Root';
import NotFound from './Components/NotFound';
import Home, { homeLoader } from './Components/Home';
import EachMovie, { eachMovieLoader } from './Components/EachMovie';
import ViewMore, { viewMoreLoader } from './Components/ViewMore';

function App() {
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Root/>} loader={rootLoader}>
        <Route index element={<Home/>} loader={homeLoader}/>
        <Route path="title/:id" element={<EachMovie/>} loader={eachMovieLoader} />
        <Route path="title/viewMore/:genre/:page" element={<ViewMore />} loader={viewMoreLoader}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
      </>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
