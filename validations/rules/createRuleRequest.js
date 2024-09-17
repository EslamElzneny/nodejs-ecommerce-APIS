import { _ValidService } from '../../services/validations.service.js';
export const createRuleValidationReqSchema = [
    _ValidService.isRequired('name','permissions'),
    _ValidService.minLength('name',3)
];
