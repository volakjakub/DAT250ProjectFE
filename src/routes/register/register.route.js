import './register.style.css';
import {Button, InputText, Password} from "primereact";
import {useState} from "react";
import {User} from "../../context/user.context";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    function handleRegister(e) {
        e.preventDefault();
        if(password === passwordAgain) {
            const user = new User(username, password, email);
            fetch('http://localhost:8000/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(user)
            })
                .then(r => {
                    if(r.ok) return r.json();
                    return Promise.reject(r);
                })
                .then(json => {
                    setError(false);
                    setSuccess(true);
                    setMessage("Registration was successful.");
                    cleanForm();
                })
                .catch(r => {
                    r.json().then((json : any) => {
                        setSuccess(false);
                        setError(true);
                        setMessage(json.message);
                    });
                });
        } else {
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