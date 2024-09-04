import { httpStatus } from "./httpStatus.js"

export const httpResp = {
    // for success res
    success : (resource = null) => {
        return {
            status : httpStatus.SUCCESS,
            data: {resource}
        }
    },
    
    error : (msg = null) => {
        const { message, data } = handleValidationErrorResp(msg);
        // return
        return {
            status : httpStatus.ERROR,
            data,
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

    paginated : (resource = null,paginate_data = {}) => {
        return {
            status : httpStatus.SUCCESS,
            data: {resource},
            ...paginate_data
        }
    },
    
}

const handleValidationErrorResp = (message = []) => {
    if(typeof message == 'string'){
        return { message,data:null}
    }
    if(typeof message == 'object' && !Array.isArray(message)){
        return {message:message.msg,data:[message]}
    }
    return {
        message: message[0].msg,
        data:message
    }

}
