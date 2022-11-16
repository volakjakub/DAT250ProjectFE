import styles from './code-form.style.css';
import {Button, InputText} from "primereact";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CodeForm = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        navigate('/detail/' + code);
    }

    return (
        <form onSubmit={handleSearch}>
            <span className="p-float-label p-input-icon-left">
                <i className="pi pi-hashtag" />
                <InputText id='CodeValue' value={code} onChange={(e) => setCode(e.target.value)} />
                <label htmlFor="CodeValue">Code</label>
            </span>
            <Button icon="pi pi-search" iconPos="center" className="p-button-rounded p-button-outlined p-button-primary formButton" />
        </form>
    );
};

export default CodeForm;