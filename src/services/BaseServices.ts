import connection from "../config/db_connect.js";

abstract class BaseServices {
    public promiseConnection: any;

    constructor() {
        this.promiseConnection = connection.promise();
    }
}

export default BaseServices;