import { _ValidService } from '../../services/validations.service.js';
export const createWishlistValidationReqSchema = [
    _ValidService.isRequired('product')
];
