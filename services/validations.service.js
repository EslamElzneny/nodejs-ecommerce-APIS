import { body } from 'express-validator'

export class ValidationService {

    constructor(){}

    isRequired = (...fields) => {
        let validationsMiddleFn = [];
        for (let index = 0; index < fields.length; index++) {
            validationsMiddleFn.push(body(fields[index]).notEmpty().withMessage(`${fields[index]} is required!`))
        }
        return validationsMiddleFn;
    }

    isEmail = (field = 'email') => {
        return body(field).optional().isEmail().withMessage(`[${field}] must be a valid email address.`)
    }

    minLength = (field,min) => {
        return body(field).isLength({min}).withMessage(`[${field}] must be at least [${min}] characters long.`)
    }

    maxLength = (field,max) => {
        return body(field).isLength({max}).withMessage(`[${field}] must be less than or equal to [${max}]`)
    }

    isOptional = (...fields) => {
        let validationsMiddleFn = [];
        for (let index = 0; index < fields.length; index++) {
            validationsMiddleFn.push(body(fields[index]).optional())
        }
        return validationsMiddleFn;
    }

}

export const _ValidService = new ValidationService; 
