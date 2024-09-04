import { _ValidService } from '../../services/validations.service.js';
export const createCategoryValidationReqSchema = [
    _ValidService.isRequired('name'),
    _ValidService.minLength('name',3)
];
