import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Root, { rootLoader } from './Components/Root';
import NotFound from './Components/NotFound';
import Home, { homeLoader } from './Components/Home';
import EachMovie, { eachMovieLoader } from './Components/EachMovie';
import ViewMore, { viewMoreLoader } from './Components/ViewMore';
import ErrorElement from './Components/ErrorElement';

function App() {
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route  path="/" element={<Root/>} loader={rootLoader} errorElement={<ErrorElement/>} scrollRestoration="enabled">
        <Route index element={<Home/>} loader={homeLoader} scrollRestoration="enabled"/>
        <Route path="title/:id" element={<EachMovie/>} loader={eachMovieLoader}  scrollRestoration="enabled"/>
        <Route path="title/viewMore/:query/:page" element={<ViewMore />} loader={viewMoreLoader} scrollRestoration="enabled"/>
      </Route>
      <Route path="*" element={<NotFound/>} scrollRestoration="enabled"/>
      </>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
