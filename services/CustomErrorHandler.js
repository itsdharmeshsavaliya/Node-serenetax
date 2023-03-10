class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }
    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }
    static wrongCredentials(message = 'Username or password is wrong!') {
        return new CustomErrorHandler(401, message);
    }
    static unAuthorized(message = 'Unauthorized user!') {
        return new CustomErrorHandler(401, message);
    }
    static notFound(message = '404 Not Found') {
        return new CustomErrorHandler(404, message);
    }
    static serverError(message = 'Internal server error') {
        return new CustomErrorHandler(500, message);
    }
    static recordNotFound(message = 'Record not found!') {
        return new CustomErrorHandler(404, message);
    }
    static somethingWrong(message = 'Something went wrong, please try again!') {
        return new CustomErrorHandler(400, message);
    }
    static customMessage(message = 'Something went wrong, please try again!') {
        return new CustomErrorHandler(400, message);
    }
    static unprocessableEntity(message = 'Please enter valid data!') {
        return new CustomErrorHandler(422, message);
    }
}
export default CustomErrorHandler;