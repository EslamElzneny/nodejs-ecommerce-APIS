import { _ValidService } from '../../services/validations.service.js';
export const createCartValidationReqSchema = [
    _ValidService.isRequired('productId','color','size')
];
