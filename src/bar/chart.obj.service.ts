import {Injectable} from 'angular2/core';

@Injectable()
export class ChartObjService {
    private chatObj: any;
    constructor() {
        this.chatObj = {
            n: 4,
            m: 12
        };
    }
    getObj() {
        return this.chatObj;
    }
}