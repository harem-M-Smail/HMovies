/* eslint-disable */
import { Link } from "react-router-dom"

const NotFound=()=>{
    return(
        <div className="not-found">
            <h2>404</h2>
            <p>Page not found</p>
            <Link className="back-to-home-btn" to="/">Back to Home</Link>
        </div>
    )
}
export default NotFound