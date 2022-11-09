import './login.style.css';
import {Button, InputText, Password} from "primereact";
import {useState} from "react";
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <h1>POLLINGATOR</h1>
            <form>
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