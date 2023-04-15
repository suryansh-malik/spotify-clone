import './Bottombeforelogin.css'
const Bottombeforelogin = () => {
    return (
      <div className="bottom-before-login">
        <div className="before-login-footer-content">
          <div className="left-footer-before-login">
            <div className="footer-heading-bofore-login">
              preview of spotify
            </div>
            <div className="footer-para-before-login">
              Sign up to get unlimited songs and podcasts with occasional ads.
              No credit card needed.
            </div>
          </div>
          <a href="/signup"><button className="right-footer-after-login-button">Sign up free</button></a>
        </div>
      </div>
    );
}
export default Bottombeforelogin;