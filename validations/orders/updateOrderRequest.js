import { _ValidService } from '../../services/validations.service.js';
import { OrderStatus } from '../../utils/enums/orderStatus.enum.js';
export const updateStatusOrderValidationReqSchema = [
    _ValidService.isRequired('status'),
    _ValidService.isIn('status',OrderStatus.ENUM) 
];
