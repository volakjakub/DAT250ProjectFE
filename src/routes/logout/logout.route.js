import './logout.style.css';
import {Button} from "primereact";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import FetchHelper from "../../helpers/fetch-helper";

const Logout = () => {
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/");
        }
    },[isLoggedIn, navigate]);

    function logoutCallback(status: boolean, body: any) {
        if(status) {
            AuthService.logout();
            navigate('/');
        } else {
            console.log(body);
        }
    }

    function handleLogout(e) {
        e.preventDefault();
        new FetchHelper().doCall('POST', 'logout', null, logoutCallback, navigate);
    }

    return (
        <>
            <h1>POLLINGATOR</h1>
            <div className='logout-wrapper'>
                <p>Are you sure you want to logout?</p>
                <br />
                <Button id='LogoutBtn' onClick={handleLogout}>Logout</Button>
            </div>
        </>
    );
};

export default Logout;