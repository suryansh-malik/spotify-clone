import { Link } from "react-router-dom";
import "./Errorpage.css"
const Errorpage = () => {
    return (
      <div className="error-page-main-div">
        <div className="error-page-inner-content">
          <img
            className="spotify-logo"
            src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg"
          ></img>
          <h1 className="heading">Page not found</h1>
          <p className="error-page-description">
            We can’t seem to find the page you are looking for.
          </p>
                <a href="/" className="error-page-home">
                    
                    Home
          </a>
        </div>
      </div>
    );
}
export default Errorpage;