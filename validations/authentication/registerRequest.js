import { _ValidService } from '../../services/validations.service.js';
export const registerValidationReqSchema = [
_ValidService.isRequired('name','email','password'),
_ValidService.isEmail('email')
];
