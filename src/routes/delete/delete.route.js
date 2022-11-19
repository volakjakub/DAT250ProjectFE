import styles from './delete.module.css';
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import FetchHelper from "../../helpers/fetch-helper";
import {Button} from "primereact";

const Delete = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const [poll, setPoll] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    function getCallback(status: boolean, body: any) {
        if(status) {
            if(AuthService.getUser().id !== body.person_id) {
                navigate('/dashboard');
            } else {
                setPoll(body);
            }
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function deleteCallback(status: boolean, body: any) {
        if(status) {
            navigate('/dashboard');
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function handleDelete(e) {
        e.preventDefault();
        new FetchHelper().doCall('DELETE', 'poll/' + poll.id, null, deleteCallback, navigate);
    }

    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/login")
        }
        new FetchHelper().doCall('GET', 'poll/' + code, null, getCallback, navigate);
    }, [isLoggedIn, navigate]);

    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            {error &&
                <p className='message errorColor'>{message}</p>
            }
            <p className='sentence'>Are you sure you want to delete poll: <span className='successColor bold'>{poll.question}</span></p>
            <div className={styles.buttonWrapper}>
                <Button onClick={handleDelete} icon="pi pi-trash" iconPos="center"
                        className="p-button-rounded"/>
            </div>
        </>
    );
};

export default Delete;