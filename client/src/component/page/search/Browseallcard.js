import { Link } from "react-router-dom";
import "./Browseallcard.css"
const Browseallcard = (props) => {
  return (
    <Link to={`/playlist/${props.link}`} className="card-main-div">
      <div className="card-main-inner-div" style={{backgroundColor:props.color}}>
              <div className="card-heading">{props.name}</div>
          <img
            src={props.image}
          className="card-image"
          alt="img"
          ></img>
        
      </div>
    </Link>
  );
};
export default Browseallcard;

