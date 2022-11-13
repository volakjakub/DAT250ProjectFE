import styles from './create.module.css';
import PollForm from "../../components/poll-form/poll-form.component";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import {useEffect} from "react";

const Create = () => {
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
            <PollForm></PollForm>
        </>
    );
};

export default Create;