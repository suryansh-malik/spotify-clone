import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const Navbarprotected = () => {
  // const Navigate = useNavigate()
  const isauthenticate = useSelector(
    (state) => state.authentication.authenticate
  );
  return isauthenticate ? <Outlet /> : <Navigate to="/" />;
};
export default Navbarprotected;
