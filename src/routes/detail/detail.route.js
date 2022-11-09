import styles from './detail.module.css';
import { useParams } from 'react-router';
import {useState} from "react";
import {Button} from "primereact";

const Detail = () => {
    const { id } = useParams();

    //TODO: Load poll from API by ID
    const pollAPI =
        {
            id: 1,
            question: 'Do you like dogs?',
            date_from: '23. 10. 2022, 10:00',
            date_to: '23. 10. 2022, 11:00',
            status: true,
            code: 'dogs',
            yes: 10,
            no: 2
        };
    const [poll, setPoll] = useState(pollAPI);

    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            <div className={styles.detailContainer}>
                <p><b>{poll.question}</b></p>
                <p>{poll.date_from}</p>
                <p>{poll.date_to}</p>
                <p># {poll.code}</p>
                {poll.status &&
                    <i className="pi pi-eye" />
                }
                {!poll.status &&
                    <i className="pi pi-eye-slash" />
                }
                <p>
                    <Button icon="pi pi-wrench" iconPos="center" className={["p-button-rounded", styles.buttonColor]} />
                </p>
                <hr />
                <div className={styles.votesContainer}>
                    <p>Yes votes: <b className={styles.purple}>{poll.yes}</b></p>
                    <p>No votes: <b className={styles.grey}>{poll.no}</b></p>
                    <p>
                        <Button icon="pi pi-check" iconPos="center" className={["p-button-rounded", styles.buttonColor]} />
                    </p>
                    <p>
                        <Button icon="pi pi-times" iconPos="center" className={["p-button-rounded", styles.buttonColor]} />
                    </p>
                </div>
            </div>
        </>
    );
};

export default Detail;