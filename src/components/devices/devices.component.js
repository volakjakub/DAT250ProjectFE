import styles from './devices.module.css';
import {Button} from "primereact";

const Devices = ({devices, action, func} : any) => {
    if(devices == null || devices.length === 0) {
        return (
            <div className={styles.devicesContainer}>
                <div className={styles.deviceRow}>
                    <p className={styles.empty}>There are no devices.</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.devicesContainer}>
                {devices.map((device: any) => (
                    <div key={device.id} className={styles.deviceRow}>
                        <p className={styles.address}>{device.address}</p>
                        <p className={styles.name}>{device.name}</p>
                        <p className={styles.assign}>
                            {action === "assign" &&
                                <Button onClick={() => {func(device.id)}} icon="pi pi-link" iconPos="center"
                                        className={["p-button-rounded", styles.buttonColor]}/>
                            }
                            {action === "delete" &&
                                <Button onClick={() => {func(device.id)}} icon="pi pi-times" iconPos="center"
                                        className={["p-button-rounded", styles.buttonColor]}/>
                            }
                        </p>
                    </div>
                ))}
            </div>
        );
    }
};

export default Devices;