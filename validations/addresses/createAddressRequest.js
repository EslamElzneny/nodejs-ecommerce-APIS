import { _ValidService } from '../../services/validations.service.js';
export const createAddressValidationReqSchema = [
    _ValidService.isRequired('address','country','governorate','city'),
    _ValidService.minLength('address',3)
];
