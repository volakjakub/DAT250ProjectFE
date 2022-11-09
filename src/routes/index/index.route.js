import CodeForm from "../../components/code-form/code-form-component";
import {useState} from "react";
import Polls from "../../components/polls/polls.component";

const Index = () => {
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
            <h1>POLLINGATOR</h1>
            <CodeForm></CodeForm>
            <br />
            <Polls polls={polls} dashboard={false}></Polls>
        </>
    );
};

export default Index;