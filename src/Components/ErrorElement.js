/* eslint-disable */
import { Link, useRouteError } from "react-router-dom"

const ErrorElement=()=>{
    const error=useRouteError()
    return(
        <div className="error-element">
            <h2>an Error Found</h2>
            <p>{error}</p>
            <Link className="back-to-home-btn" to="/">Back to Home</Link>

        </div>
    )
}
export default ErrorElement