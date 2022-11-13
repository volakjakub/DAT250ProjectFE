import styles from './poll-form.module.css';
import {Button, Checkbox, InputText} from "primereact";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import {Poll} from "../../context/poll.context";

const PollForm = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [opened, setOpened] = useState(true);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    function handleCreate(e) {
        e.preventDefault();
        const poll = new Poll(question, opened, status, AuthService.getUser().id);
        fetch('http://localhost:8000/poll', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(poll)
        })
            .then(r => {
                if(r.ok) return r.json();
                return Promise.reject(r);
            })
            .then(json => {
                navigate('/detail/'+json.id);
            })
            .catch(r => {
                r.json().then((json : any) => {
                    setError(true);
                    setMessage(json.message);
                });
            });
    }

    return (
        <>
            {error &&
                <p className='message errorColor'>{message}</p>
            }
            <form onSubmit={handleCreate}>
                <span className="p-float-label inputWrapper">
                    <InputText id='QuestionValue' value={question} onChange={(e) => setQuestion(e.target.value)} />
                    <label htmlFor="QuestionValue">Question</label>
                </span>
                <div className="field-checkbox inputWrapper">
                    <Checkbox id='OpenedValue' onChange={e => setOpened(e.target.checked)} checked={opened}></Checkbox>
                    <label htmlFor="OpenedValue" className="p-checkbox-label" className={styles.checkboxLabel}>Opened</label>
                </div>
                <div className="field-checkbox inputWrapper">
                    <Checkbox id='StatusValue' onChange={e => setStatus(e.target.checked)} checked={status}></Checkbox>
                    <label htmlFor="StatusValue" className="p-checkbox-label" className={styles.checkboxLabel}>Status</label>
                </div>
                <Button icon="pi pi-plus" iconPos="center" className="p-button-rounded p-button-outlined p-button-primary formButton" />
            </form>
        </>
    );
};

export default PollForm;