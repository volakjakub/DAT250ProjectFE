import styles from './dashboard.module.css';
import {useEffect, useState} from "react";
import Polls from "../../components/polls/polls.component";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "primereact";
import FetchHelper from "../../helpers/fetch-helper";
import {AuthService} from "../../services/AuthService.service";

const Dashboard = () => {
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const [polls, setPolls] = useState(null);

    function pollsCallback(status: boolean, body: any) {
        if(status) {
            setPolls(body);
        } else {
            setPolls(null);
        }
    }

    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/login")
        }
        new FetchHelper().doCall('GET', 'poll', null, pollsCallback, navigate);
    }, [isLoggedIn, navigate]);

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