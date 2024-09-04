import { _ValidService } from '../../services/validations.service.js';
export const loginValidationReqSchema = [
    _ValidService.isRequired('email','password'),
    _ValidService.isEmail('email')
];
