import { _ValidService } from '../../services/validations.service.js';
export const updateCartValidationReqSchema = [
    _ValidService.isRequired('quantity'),
    _ValidService.min('quantity',1)
];
