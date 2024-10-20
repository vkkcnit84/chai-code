class ApiError extends Error {
    constructor(
        statusCode,
        message='something went wrong',
        errors=[],
        statck=null
    ) {
        super(message),
        this.statusCode = statusCode,
        this.errors = errors,
        this.data = null,
        this.message = message,
        this.statck = statck
        this.success = false

        // below code is optional
        if(statck) {
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }