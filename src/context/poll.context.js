export class Poll {
    question: string;
    opened: boolean;
    status: boolean;
    person_id: number;

    constructor(question, opened, status, person_id) {
        this.question = question;
        this.opened = opened;
        this.status = status;
        this.person_id = person_id;
    }
}