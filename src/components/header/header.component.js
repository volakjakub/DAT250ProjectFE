import './header.style.css';
import {Button} from "primereact";
import {Link} from "react-router-dom";


const Header = (props: any) => {
    if(props.user != null) {
        return (
            <header>
                <div>
                    <Link to="/">
                        <Button icon="pi pi-home" iconPos="center" className="p-button-rounded p-button-primary buttonSpacing"/>
                    </Link>
                    <Link to="/dashboard">
                        <Button icon="pi pi-user" iconPos="center" className="p-button-rounded p-button-outlined p-button-primary buttonSpacing"/>
                    </Link>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <div>
                    <Link to="/">
                        <Button icon="pi pi-home" iconPos="center" className="p-button-rounded p-button-primary buttonSpacing"/>
                    </Link>
                    <Link to="/login">
                        <Button icon="pi pi-sign-in" iconPos="center" className="p-button-rounded p-button-outlined p-button-primary buttonSpacing"/>
                    </Link>
                </div>
            </header>
        );
    }
};

export default Header;