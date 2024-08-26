const STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

class BaseError extends Error {
    constructor(name, statusCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this)
    }
}

class ApiError extends BaseError {
    constructor(description = "api error") {
        super("api internal error", STATUS_CODE.INTERNAL_ERROR, description);
    }
}

class ValidationError extends BaseError {
    constructor(description = "bad request") {
        super("bad request", STATUS_CODE.BAD_REQUEST, description);
    }
}

class AuthorizeError extends BaseError {
    constructor(description = "access denied") {
        super("access denied", STATUS_CODE.UN_AUTHORISED, description);
    }
}

class NotFoundError extends BaseError {
    constructor(description = "not found") {
        super("not found", STATUS_CODE.NOT_FOUND, description);
    }
}


module.exports = {
    ApiError,
    ValidationError,
    AuthorizeError,
    NotFoundError,
}