import CodeForm from "../../components/code-form/code-form-component";
import {useEffect, useState} from "react";
import Polls from "../../components/polls/polls.component";
import FetchHelper from "../../helpers/fetch-helper";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();
    const [polls, setPolls] = useState(null);

    function pollsCallback(status: boolean, body: any) {
        if(status) {
            setPolls(body);
        } else {
            setPolls(null);
        }
    }

    useEffect(() => {
        new FetchHelper().doCall('GET', 'public/poll', null, pollsCallback, navigate);
    },[]);

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