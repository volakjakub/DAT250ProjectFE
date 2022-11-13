import styles from './detail.module.css';
import { useParams } from 'react-router';
import {useEffect, useState} from "react";
import {Button} from "primereact";
import {AuthService} from "../../services/AuthService.service";

const Detail = () => {
    const { id } = useParams();
    const isLoggedIn = AuthService.isLoggedIn();
    const [poll, setPoll] = useState("{}");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [canVote, setCanVote] = useState(true);

    useEffect(() => {
        if(isLoggedIn) {
            fetch('http://localhost:8000/poll/' + id, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
                .then(r => {
                    if (r.ok) return r.json();
                    return Promise.reject(r);
                })
                .then(json => {
                    if(json.person_id === AuthService.getUser().id) setCanVote(false);
                    setPoll(json);
                })
                .catch(r => {
                    r.json().then((json: any) => {
                        setError(true);
                        setMessage(json.message);
                    });
                });
        } else {
            fetch('http://localhost:8000/public/poll/' + id, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
                .then(r => {
                    if (r.ok) return r.json();
                    return Promise.reject(r);
                })
                .then(json => {
                    setPoll(json);
                })
                .catch(r => {
                    r.json().then((json: any) => {
                        setError(true);
                        setMessage(json.message);
                    });
                });
        }
    }, [id, isLoggedIn, setPoll]);

    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            {error &&
                <p className='message errorColor'>{message}</p>
            }
            {!error &&
                <div className={styles.detailContainer}>
                    <p># {poll.code}</p>
                    <p><b>{poll.question}</b></p>
                    {poll.opened &&
                        <p>OPENED</p>
                    }
                    {!poll.opened &&
                        <p>CLOSED</p>
                    }
                    {poll.status &&
                        <i className="pi pi-eye"/>
                    }
                    {!poll.status &&
                        <i className="pi pi-eye-slash"/>
                    }
                    {isLoggedIn && poll.person_id === AuthService.getUser().id &&
                        <p>
                            <Button icon="pi pi-wrench" iconPos="center"
                                    className={["p-button-rounded", styles.buttonColor]}/>
                        </p>
                    }
                    <hr/>
                    <div className={styles.votesContainer}>
                        <p>Yes votes: <b className={styles.purple}>{poll.yes}</b></p>
                        <p>No votes: <b className={styles.grey}>{poll.no}</b></p>
                        {poll.opened && ((!poll.status && isLoggedIn) || poll.status) && canVote &&
                            <>
                                <p>
                                    <Button icon="pi pi-check" iconPos="center"
                                            className={["p-button-rounded", styles.buttonColor]}/>
                                </p>
                                <p>
                                    <Button icon="pi pi-times" iconPos="center"
                                            className={["p-button-rounded", styles.buttonColor]}/>
                                </p>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default Detail;