import styles from './update.module.css';
import PollForm from "../../components/poll-form/poll-form.component";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import {useEffect} from "react";
import {useParams} from "react-router";

const Update = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();

    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/login")
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            <PollForm code={code}></PollForm>
        </>
    );
};

export default Update;