import { _ValidService } from '../../services/validations.service.js';
export const updateRuleValidationReqSchema = [
    _ValidService.isOptional('name','permissions'),
    _ValidService.minLength('name',3)
];
