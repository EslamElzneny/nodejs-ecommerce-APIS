import { _ValidService } from '../../services/validations.service.js';
export const updateUserValidationReqSchema = [
    _ValidService.isOptional('email','name'),
    _ValidService.isEmail('email'),
    _ValidService.minLength('name',3)
];
