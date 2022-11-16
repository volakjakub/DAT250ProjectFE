import './register.style.css';
import {Button, InputText, Password} from "primereact";
import {useEffect, useState} from "react";
import {User} from "../../context/user.context";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import FetchHelper from "../../helpers/fetch-helper";

const Register = () => {
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(isLoggedIn) {
            navigate("/dashboard")
        }
    }, [isLoggedIn, navigate]);

    function registerCallback(status: boolean, body: any) {
        if(status) {
            setError(false);
            setSuccess(true);
            setMessage("Registration was successful.");
            cleanForm();
        } else {
            setSuccess(false);
            setError(true);
            setMessage(body);
        }
    }

    function handleRegister(e) {
        e.preventDefault();
        if(password === passwordAgain) {
            const user = new User(username, password, email);
            new FetchHelper().doCall('POST', 'register', JSON.stringify(user), registerCallback, navigate);
        } else {
            setSuccess(false);
            setError(true);
            setMessage("Passwords aren't same!");
        }
    }

    function cleanForm() {
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordAgain("");
    }

    return (
        <>
            <h1>POLLINGATOR</h1>
            {error &&
                <p className='message errorColor'>{message}</p>
            }
            {success &&
                <p className='message successColor'>{message}</p>
            }
            <form onSubmit={handleRegister}>
                <span className="p-float-label inputWrapper">
                    <InputText id='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="Username">Username</label>
                </span>
                <span className="p-float-label inputWrapper">
                    <InputText id='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="Email">Email</label>
                </span>
                <span className="p-float-label inputWrapper">
                    <Password id='Password' value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} />
                    <label htmlFor="Password">Password</label>
                </span>
                <span className="p-float-label">
                    <Password id='PasswordAgain' value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} feedback={false} />
                    <label htmlFor="PasswordAgain">Password again</label>
                </span>
                <Button icon="pi pi-send" iconPos="center"
                        className="p-button-rounded p-button-outlined p-button-primary formButton" />
            </form>
        </>
    );
};

export default Register;