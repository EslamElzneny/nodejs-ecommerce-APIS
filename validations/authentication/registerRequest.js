import { _ValidService } from '../../services/validations.service.js';
export const registerValidationReqSchema = [
    _ValidService.isRequired('name','email','password','ruleId'),
    _ValidService.isEmail('email'),
    _ValidService.minLength('name',3),
    _ValidService.minLength('password',5)
];
