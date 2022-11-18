export class Vote {
    answer: boolean;
    poll_id: number;
    person_id: number;
    device_id: number;

    constructor(answer, poll_id, person_id, device_id) {
        this.answer = answer;
        this.poll_id = poll_id;
        this.person_id = person_id;
        this.device_id = device_id;
    }
}