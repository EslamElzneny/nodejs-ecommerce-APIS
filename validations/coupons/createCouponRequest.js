import { _ValidService } from '../../services/validations.service.js';
export const createCouponValidationReqSchema = [
    _ValidService.isRequired('name','expire','discount'),
    _ValidService.minLength('name',3),
    _ValidService.maxLength('name',50),
    _ValidService.min('discount',1)
];
