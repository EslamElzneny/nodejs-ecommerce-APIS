import { _ValidService } from '../../services/validations.service.js';
export const updateAddressValidationReqSchema = [
    _ValidService.isOptional('address','country','governorate','city')
];
