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
        return body(field).isEmail().withMessage(`${field} is invalid!`)
    }

}

export const _ValidService = new ValidationService; 
