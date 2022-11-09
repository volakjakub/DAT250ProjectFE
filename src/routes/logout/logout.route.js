import './logout.style.css';
import {Button} from "primereact";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";

const Logout = () => {
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/")
        }
    },[]);

    function handleLogout(e) {
        e.preventDefault();
        AuthService.logout();
        fetch('http://localhost:8000/logout', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(r => {
                if(r.ok) return;
                return Promise.reject(r);
            })
            .then(() => {
                AuthService.logout();
                navigate('/');
            })
            .catch(r => {
                console.log(r);
            });
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