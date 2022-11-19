import React from 'react';
import {AuthService} from "../services/AuthService.service";

export default class FetchHelper extends React.Component {
   doCall(method: string, address: string, body: any, callback: any, navigate: any) {
        fetch('http://localhost:8000/' + address, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: body
        })
        .then(r => {
            if(r.ok) {
                if(r.url === "http://localhost:8000/logout") {
                    callback(true, "");
                    return;
                }
                r.json().then((json: any) => {
                    callback(true, json);
                });
            }
            else return Promise.reject(r);
        })
        .catch(r => {
            if(r.status === 401) {
                AuthService.logout();
                navigate('/login');
            } else {
                r.json().then((json : any) => {
                    callback(false, json.message);
                });
            }
        });
    }
}