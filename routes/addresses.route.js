import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { _AddressesControllers } from '../controllers/addresses.controller.js';
import { createAddressValidationReqSchema } from '../validations/addresses/createAddressRequest.js';
import { updateAddressValidationReqSchema } from '../validations/addresses/updateAddressRequest.js';
export const addressRouter = express.Router();

addressRouter.use(authMiddleware);
addressRouter.route('/')
        .get(_AddressesControllers.filterAddressForLoggedUser,_AddressesControllers.index)
        .post(
                createAddressValidationReqSchema,
                handleValidateErrorReq,
                _AddressesControllers.filterAddressForLoggedUser,
                _AddressesControllers.store
        );

addressRouter.route('/:id')
        .get(_AddressesControllers.show)
        .patch(
                updateAddressValidationReqSchema,
                handleValidateErrorReq,
                _AddressesControllers.update
        )
        .delete(
                _AddressesControllers.destroy
        );
