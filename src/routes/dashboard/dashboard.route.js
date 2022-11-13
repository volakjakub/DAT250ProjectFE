import styles from './dashboard.module.css';
import {useEffect, useState} from "react";
import Polls from "../../components/polls/polls.component";
import {Link} from "react-router-dom";
import {Button} from "primereact";

const Dashboard = () => {
    const [polls, setPolls] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/poll', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(r => {
                if(r.ok) return r.json();
                return Promise.reject(r);
            })
            .then(json => {
                setPolls(json);
            })
            .catch(r => {
                setPolls(null);
            });
    },[setPolls]);

    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            <Polls polls={polls} dashboard={true}></Polls>
            <div className={styles.buttonWrapper}>
                <Link to='/create'>
                    <Button icon="pi pi-plus" iconPos="center"
                            className="p-button-rounded" />
                </Link>
            </div>
        </>
    );
};

export default Dashboard;