const STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

class BaseError extends Error{
    constructor(name, statusCode, description){
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this)
    }
}

class ApiError extends BaseError{
    constructor(description = "API ERROR"){
        super("Api Internal Error", STATUS_CODE.INTERNAL_ERROR,description);
    }
}