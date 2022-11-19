import styles from './poll-form.module.css';
import {Button, Checkbox, InputText} from "primereact";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import {Poll} from "../../context/poll.context";
import FetchHelper from "../../helpers/fetch-helper";

const PollForm = (props: any) => {
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [question, setQuestion] = useState("");
    const [opened, setOpened] = useState(true);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(props.code !== null) {
            new FetchHelper().doCall('GET', 'poll/' + props.code, null, getCallback, navigate);
        }
    }, []);

    function getCallback(status: boolean, body: any) {
        if(status) {
            if(AuthService.getUser().id !== body.person_id) {
                navigate('/dashboard');
            } else {
                setId(body.id);
                setQuestion(body.question);
                setOpened(body.opened);
                setStatus(body.status);
            }
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function fetchCallback(status: boolean, body: any) {
        if(status) {
            navigate('/detail/'+body.code);
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function handleCreate(e) {
        e.preventDefault();
        try {
            const poll = new Poll(question, opened, status, AuthService.getUser().id);
            new FetchHelper().doCall('POST', 'poll', JSON.stringify(poll), fetchCallback, navigate);
        } catch (e) {
            setError(true);
            setMessage('Unexpected error. Please, try it again...');
        }
    }

    function handleUpdate(e) {
        e.preventDefault();
        if(id !== null) {
            try {
                const poll = new Poll(question, opened, status, AuthService.getUser().id);
                new FetchHelper().doCall('PUT', 'poll/' + id, JSON.stringify(poll), fetchCallback, navigate);
            } catch (e) {
                setError(true);
                setMessage('Unexpected error. Please, try it again...');
            }
        } else {
            navigate('/dashboard');
        }
    }

    return (
        <>
            {error &&
                <p className='message errorColor'>{message}</p>
            }
            {props.code === null &&
                <form onSubmit={handleCreate}>
                <span className="p-float-label inputWrapper">
                    <InputText id='QuestionValue' value={question} onChange={(e) => setQuestion(e.target.value)}/>
                    <label htmlFor="QuestionValue">Question</label>
                </span>
                    <div className="field-checkbox inputWrapper">
                        <Checkbox id='OpenedValue' onChange={e => setOpened(e.target.checked)}
                                  checked={opened}></Checkbox>
                        <label htmlFor="OpenedValue" className="p-checkbox-label"
                               className={styles.checkboxLabel}>Opened</label>
                    </div>
                    <div className="field-checkbox inputWrapper">
                        <Checkbox id='StatusValue' onChange={e => setStatus(e.target.checked)}
                                  checked={status}></Checkbox>
                        <label htmlFor="StatusValue" className="p-checkbox-label"
                               className={styles.checkboxLabel}>Status</label>
                    </div>
                    <Button icon="pi pi-plus" iconPos="center"
                            className="p-button-rounded p-button-outlined p-button-primary formButton"/>
                </form>
            }
            {props.code !== null &&
                <form onSubmit={handleUpdate}>
                <span className="p-float-label inputWrapper">
                    <InputText id='QuestionValue' value={question} onChange={(e) => setQuestion(e.target.value)}/>
                    <label htmlFor="QuestionValue">Question</label>
                </span>
                    <div className="field-checkbox inputWrapper">
                        <Checkbox id='OpenedValue' onChange={e => setOpened(e.target.checked)}
                                  checked={opened}></Checkbox>
                        <label htmlFor="OpenedValue" className="p-checkbox-label"
                               className={styles.checkboxLabel}>Opened</label>
                    </div>
                    <div className="field-checkbox inputWrapper">
                        <Checkbox id='StatusValue' onChange={e => setStatus(e.target.checked)}
                                  checked={status}></Checkbox>
                        <label htmlFor="StatusValue" className="p-checkbox-label"
                               className={styles.checkboxLabel}>Status</label>
                    </div>
                    <Button icon="pi pi-plus" iconPos="center"
                            className="p-button-rounded p-button-outlined p-button-primary formButton"/>
                </form>
            }
        </>
    );
};

export default PollForm;