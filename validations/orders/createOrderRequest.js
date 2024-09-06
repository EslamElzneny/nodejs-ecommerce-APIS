import { _ValidService } from '../../services/validations.service.js';
export const createOrderValidationReqSchema = [
    _ValidService.isRequired('shipping_address_id')
];
