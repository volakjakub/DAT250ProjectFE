import './polls.style.css';
import {Button} from "primereact";
import {Link} from "react-router-dom";

const Polls = ({ polls, dashboard } : any) => {
    if(polls == null || polls.length === 0) {
        return (
            <div className='pollsContainer'>
                <div className='pollRow'>
                    <p className='empty'>There are no polls.</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className='pollsContainer'>
                {polls.map((poll: any) => (
                    <div key={poll.id} className='pollRow'>
                        <p className='code'><span>#</span> {poll.code}</p>
                        <p className='question'>{poll.question}</p>
                        {poll.opened &&
                            <p className='opened'>Opened</p>
                        }
                        {!poll.opened &&
                            <p className='opened'>Closed</p>
                        }
                        {dashboard &&
                            <p className='visible'>
                                {poll.status &&
                                    <Button icon="pi pi-eye" iconPos="center"
                                            className="p-button-rounded p-button-outlined p-button-primary"/>
                                }
                                {!poll.status &&
                                    <Button icon="pi pi-eye-slash" iconPos="center"
                                            className="p-button-rounded p-button-outlined p-button-primary"/>
                                }
                            </p>
                        }
                        {dashboard &&
                            <p className='info'>
                                <Link to={{pathname: `/detail/${poll.code}`, state: poll.code}}>
                                    <Button icon="pi pi-angle-right" iconPos="center"
                                            className="p-button-rounded"/>
                                </Link>
                            </p>
                        }
                        {!dashboard &&
                            <p className='info-normal'>
                                <Link to={{pathname: `/detail/${poll.code}`, state: poll.code}}>
                                    <Button icon="pi pi-angle-right" iconPos="center"
                                            className="p-button-rounded"/>
                                </Link>
                            </p>
                        }
                    </div>
                ))}
            </div>
        );
    }
};

export default Polls;