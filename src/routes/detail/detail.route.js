import styles from './detail.module.css';
import { useParams } from 'react-router';
import {useEffect, useState} from "react";
import {Button} from "primereact";
import {AuthService} from "../../services/AuthService.service";
import {Link, useNavigate} from "react-router-dom";
import FetchHelper from "../../helpers/fetch-helper";
import {Vote} from "../../context/vote.context";

const Detail = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const [poll, setPoll] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [canVote, setCanVote] = useState(true);

    function publicPollCallback(status: boolean, body: any) {
        if(status) {
            setPoll(body);
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function privatePollCallback(status: boolean, body: any) {
        if(status) {
            setError(false);
            setPoll(body);
            if(body.person_id === AuthService.getUser().id) setCanVote(false);
        } else {
            setError(true);
            setMessage(body);
        }
    }

    function voteCallback(status: boolean, body: any) {
        console.log(body);
        if(status) {
            let updatedPoll = JSON.parse(poll);
            if(body.answer) {
                updatedPoll.yes += 1;
            } else {
                updatedPoll.no += 1;
            }
            setPoll(JSON.stringify(updatedPoll));
        } else {
            setError(true);
            setMessage(body);
        }
    }

    useEffect(() => {
        new FetchHelper().doCall('GET', 'public/poll/' + code, null, publicPollCallback, navigate);
        if(isLoggedIn) {
            new FetchHelper().doCall('GET', 'poll/' + code, null, privatePollCallback, navigate);
        }
    }, []);

    function voteHandler(e, answer: boolean) {
        e.preventDefault();
        let vote;
        if(isLoggedIn) {
            vote = new Vote(answer, poll.id, AuthService.getUser().id, null);
            new FetchHelper().doCall('POST', 'vote', JSON.stringify(vote), voteCallback, navigate);
        } else {
            vote = new Vote(answer, poll.id, null, null);
            new FetchHelper().doCall('POST', 'public/vote', JSON.stringify(vote), voteCallback, navigate);
        }
    }

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
                            <Link to={{pathname: `/update/${poll.code}`, state: poll.code}}>
                                <Button icon="pi pi-wrench" iconPos="center"
                                        className={["p-button-rounded", styles.buttonColor]}/>
                            </Link>
                        </p>
                    }
                    <hr/>
                    <div className={styles.votesContainer}>
                        <p>Yes votes: <b className={styles.purple}>{poll.yes}</b></p>
                        <p>No votes: <b className={styles.grey}>{poll.no}</b></p>
                        {poll.opened && ((!poll.status && isLoggedIn) || poll.status) && canVote &&
                            <>
                                <p>
                                    <Button onClick={(e) => {voteHandler(e, true)}} icon="pi pi-check" iconPos="center"
                                            className={["p-button-rounded", styles.buttonColor]}/>
                                </p>
                                <p>
                                    <Button onClick={(e) => {voteHandler(e, false)}} icon="pi pi-times" iconPos="center"
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