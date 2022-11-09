import styles from './poll-form.module.css';
import {Button, Calendar, Checkbox, InputText} from "primereact";
import {useState} from "react";

const PollForm = () => {
    const [person, setPerson] = useState(1);
    const [question, setQuestion] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [code, setCode] = useState("");
    const [status, setStatus] = useState(false);

    return (
        <form>
            <span className="p-float-label inputWrapper">
                <InputText id='QuestionValue' value={question} onChange={(e) => setQuestion(e.target.value)} />
                <label htmlFor="QuestionValue">Question</label>
            </span>
            <span className="p-float-label inputWrapper">
                <Calendar id="DateFromValue" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} showTime showSeconds />
                <label htmlFor="DateFromValue">From</label>
            </span>
            <span className="p-float-label inputWrapper">
                <Calendar id="DateFromValue" value={dateTo} onChange={(e) => setDateTo(e.target.value)} showTime showSeconds />
                <label htmlFor="DateFromValue">To</label>
            </span>
            <span className="p-float-label inputWrapper">
                <InputText id='CodeValue' value={code} onChange={(e) => setCode(e.target.value)} />
                <label htmlFor="CodeValue">Code</label>
            </span>
            <div className="field-checkbox inputWrapper">
                <Checkbox id='StatusValue' onChange={e => setStatus(e.target.checked)} checked={status}></Checkbox>
                <label htmlFor="StatusValue" className="p-checkbox-label" className={styles.checkboxLabel}>Status</label>
            </div>
            <Button icon="pi pi-plus" iconPos="center" className="p-button-rounded p-button-outlined p-button-primary formButton" />
        </form>
    );
};

export default PollForm;