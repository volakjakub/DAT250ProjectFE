import './login.style.css';
import {Button, InputText, Password} from "primereact";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {User} from "../../context/user.context";
import {AuthService} from "../../services/AuthService.service";
import FetchHelper from "../../helpers/fetch-helper";

const Login = () => {
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(isLoggedIn) {
            navigate("/dashboard")
        }
    }, [isLoggedIn, navigate]);

    function loginCallback(status: boolean, body: any) {
        if(status) {
            sessionStorage.setItem('User', JSON.stringify(body));
            navigate('/dashboard');
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const user = new User(username, password, null);
        new FetchHelper().doCall('POST', 'login', JSON.stringify(user), loginCallback, navigate);
    }

    return (
        <>
            <h1>POLLINGATOR</h1>
            {error &&
                <p className='message errorColor'>{message}</p>
            }
            <form onSubmit={handleLogin}>
                <span className="p-float-label inputWrapper">
                    <InputText id='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="Username">Username</label>
                </span>
                <span className="p-float-label">
                    <Password id='Password' value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
                    <label htmlFor="Password">Password</label>
                </span>
                <Button icon="pi pi-sign-in" iconPos="center" className="p-button-rounded p-button-outlined p-button-primary formButton" />
            </form>
            <br />
            <p>If you don't have account, register <Link to='/register'><span>here</span></Link>.</p>
        </>
    );
};

export default Login;