import { httpStatus } from "./httpStatus.js"

const httpResp = {
    // for success res
    success : (resource = null) => {
        return {
            status : httpStatus.SUCCESS,
            data: {resource}
        }
    },
    
    error : (message = null) => {
        return {
            status : httpStatus.ERROR,
            data: null,
            message
        }
    },

    general : (message = null,status = httpStatus.ERROR,code = 500) => {
        return {
            status :status,
            data: null,
            message,
            code
        }
    },

    paginated : (resource = null) => {
        return
        return {
            status : httpStatus.SUCCESS,
            data: {resource},
        }
    },
    
}

module.exports = httpResp;
