import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom';
const Protectedroutes = () => {
    // const Navigate = useNavigate()
    const isauthenticate = useSelector(
      (state) => state.authentication.authenticate
    );
    return (
        isauthenticate ? <Outlet/>:<Navigate to="/login" />
            );
}
export default Protectedroutes;
