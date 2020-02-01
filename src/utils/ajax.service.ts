import { timingSafeEqual } from "crypto";

export class AjaxUtil {
    private xhr: XMLHttpRequest;
    private HTTP_OK = 200;
    private HTTP_CONFLICT = 409;

    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    setHeaders() {
        this.xhr.setRequestHeader('Content-Type', 'application/json');
    }

    get(route: string, callback: CallableFunction = null) {
        this.xhr.open('GET', route);
        this.xhr.onload = () => {
            if (callback !== undefined) {
                callback(this.xhr.responseText);
            }
            return this.xhr.responseText;
        }
        this.setHeaders();
        this.xhr.send();
    }
    post(route: string, data: any, callback:CallableFunction = null) {
        this.xhr.open('POST', route);

        this.xhr.onload = () => {
            callback(JSON.parse(this.xhr.responseText));
        }
        this.setHeaders();
        this.xhr.send(JSON.stringify(data));
    }
}