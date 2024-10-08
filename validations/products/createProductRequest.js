import { _ValidService } from '../../services/validations.service.js';
export const createProductValidationReqSchema = [
    _ValidService.isRequired('title','price','quantity','description','category'),
    _ValidService.minLength('title',3),
    _ValidService.maxLength('title',100),
    _ValidService.min('price',1),
    _ValidService.min('quantity',1),
    _ValidService.minLength('description',20),
];
