import CodeForm from "../../components/code-form/code-form-component";
import {useEffect, useState} from "react";
import Polls from "../../components/polls/polls.component";

const Index = () => {
    const [polls, setPolls] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/public/poll', {
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