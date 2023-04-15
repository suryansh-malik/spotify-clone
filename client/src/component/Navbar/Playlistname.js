import {useNavigate} from "react-router-dom"
const Playlistname = (props) => {
    const navigate = useNavigate()
    const clicked = () => {
        navigate(`playlist/${props.playlistid}`)
    }
    return <p onClick={clicked}  className="liked-playlist-navbar-name">{props.playlistname}</p>;
}
export default Playlistname;
