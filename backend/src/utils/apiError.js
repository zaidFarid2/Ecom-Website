
class ApiError extends Error{
    constructor(message= "something went wrong",stack = "",errors = [],statusCode){
        super(message)
        this.stack = stack
        this.message = message
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.success =false

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export {ApiError}