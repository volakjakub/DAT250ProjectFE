import styles from './update.module.css';
import PollForm from "../../components/poll-form/poll-form.component";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../services/AuthService.service";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import FetchHelper from "../../helpers/fetch-helper";
import Devices from "../../components/devices/devices.component";

const Update = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = AuthService.isLoggedIn();
    const [freeDevices, setFreeDevices] = useState(null);
    const [devices, setDevices] = useState(null);

    function freeDevicesCallback(status: boolean, body: any) {
        if(status) {
            setFreeDevices(body);
        } else {
            setFreeDevices(null);
        }
    }

    function devicesCallback(status: boolean, body: any) {
        if(status) {
            setDevices(body);
        } else {
            setDevices(null);
        }
    }

    function actionCallback(status: boolean, body: any) {
        new FetchHelper().doCall('GET', 'device', null, freeDevicesCallback, navigate);
        new FetchHelper().doCall('GET', 'poll/'+code+'/device', null, devicesCallback, navigate);
    }

    function assignDevice(deviceId: number) {
        new FetchHelper().doCall('POST', 'poll/'+code+'/device', JSON.stringify(deviceId), actionCallback, navigate);
    }

    function deleteDevice(deviceId: number) {
        new FetchHelper().doCall('DELETE', 'poll/'+code+'/device/'+deviceId, null, actionCallback, navigate);
    }

    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/login")
        }
        new FetchHelper().doCall('GET', 'device', null, freeDevicesCallback, navigate);
        new FetchHelper().doCall('GET', 'poll/'+code+'/device', null, devicesCallback, navigate);
    }, [isLoggedIn, navigate, code]);

    return (
        <>
            <h1 className={styles.heading}>POLLINGATOR</h1>
            <PollForm code={code}></PollForm>
            <hr className={styles.line} />
            <h2>DEVICES</h2>
            <Devices action="delete" devices={devices} func={deleteDevice}></Devices>
            <Devices action="assign" devices={freeDevices} func={assignDevice}></Devices>
        </>
    );
};

export default Update;