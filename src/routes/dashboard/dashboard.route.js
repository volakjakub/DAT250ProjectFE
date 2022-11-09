import styles from './dashboard.module.css';
import {useState} from "react";
import Polls from "../../components/polls/polls.component";
import {Link} from "react-router-dom";
import {Button} from "primereact";

const Dashboard = () => {
    const pollz = [
        {
            id: 1,
            question: 'Do you like dogs?',
            date_from: '23. 10. 2022, 10:00',
            date_to: '23. 10. 2022, 11:00',
            status: true,
            code: 'dogs'
        },
        {
            id: 2,
            question: 'Do you want pizza for dinner?',
            date_from: '29. 10. 2022, 15:00',
            date_to: '29. 10. 2022, 16:00',
            status: false,
            code: 'pizza'
        },
        {
            id: 3,
            question: 'Is it raining in your country?',
            date_from: '23. 10. 2022, 00:00',
            date_to: '23. 10. 2022, 24:00',
            status: true,
            code: 'rain'
        },
    ];
    const [polls, setPolls] = useState(pollz);

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