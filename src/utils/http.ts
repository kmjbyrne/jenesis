export class HttpUtil {
    GET = 'GET';
    POST = 'POST';
    DEFAULT_CONTENT = 'application/json';

    url: any;
    http: XMLHttpRequest;

    constructor(url, success, error) {
        this.url = url;
        this.http = new XMLHttpRequest();
        this.http.onreadystatechange = () => {
            if (this.http.readyState == 4 && this.http.status == 200) {
                alert(this.http.responseText);
            } else {
                alert(this.http.responseText);
            }
        }
    }

    setHeaders() {
        this.http.setRequestHeader('Content-type', this.DEFAULT_CONTENT);
    }

    mapCallbacks(success, error) {
        if (success == null) {
            success = alert(this.http.responseText);
        }

        if (error == null) {
            error = alert(this.http.responseText);
        }

        this.http.onload = success;
        this.http.onerror = error;
    }

    process() {
        if (this.http.readyState == 4 && this.http.status == 200) {
            if (this.http.responseText == "Not found") {
                alert(this.http.responseText)
            } else {
                alert(this.http.responseText);
            }
        }
    }

    setup() {
        this.setHeaders();
    }

    static get(url, successCallback = null, errorCallback = null) {
        console.log('FINISHED GET');
        // let controller = new HttpUtil(url);
        // controller.http.open(this.GET, this.url, true);
        // controller.setup();
        // controller.http.send();
        console.log('FINISHED GET');
    }
    static GET(GET: any, url: any, arg2: boolean) {
        throw new Error("Method not implemented.");
    }

    static post(url, data, successCallback = null, errorCallback = null) {
        // let controller = new HttpUtil(url);
        // controller.http.open(this.POST, this.url, true);
        // controller.setup();
        // controller.http.send(data);
    }
    static POST(POST: any, url: any, arg2: boolean) {
        throw new Error("Method not implemented.");
    }

}