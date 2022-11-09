import styles from './create.module.css';
import PollForm from "../../components/poll-form/poll-form.component";

const Create = () => {
    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            <PollForm></PollForm>
        </>
    );
};

export default Create;