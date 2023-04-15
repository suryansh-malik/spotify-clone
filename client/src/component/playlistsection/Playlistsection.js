import './Playlistsection.css'
import Playlist from '../playlist/Playlist'
const Playlistsection = (props) => {
    const playlist = props.data.playlists.map((p) => (
      <Playlist
        playlistid={p.playlistid}
        playlistname={p.playlistname}
        playlistimage={p.playlistimage}
        playlistdescription={p.playlistdescription}
        key={p.playlistid}
      />
    ));
    return (
        <div className="section-playlist">
        <h1 className="playlist-section-heading">{props.data.playlistgroupname}</h1>
        <div className="playlist-name">
         {playlist}
        </div>
      </div>
    )
}
export default Playlistsection