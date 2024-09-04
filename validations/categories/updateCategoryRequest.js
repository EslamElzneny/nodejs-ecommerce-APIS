import { _ValidService } from '../../services/validations.service.js';
export const updateCategoryValidationReqSchema = [
    _ValidService.isRequired('name'),
    _ValidService.minLength('name',3)
];
