import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { handleValidateErrorReq } from '../middlewares/handleValidateErrorReq.middleware.js';
import { createRuleValidationReqSchema } from '../validations/rules/createRuleRequest.js';
import { updateRuleValidationReqSchema } from '../validations/rules/updateRuleRequest.js';
import { _RolesControllers } from '../controllers/roles.controller.js';
import { permissionsMiddleware } from '../middlewares/permissions.middleware.js';
import { Role } from '../models/Role.model.js';
export const roleRouter = express.Router();
const modelName = Role.modelName;

roleRouter.use(authMiddleware);
roleRouter.route('/')
        .get(permissionsMiddleware(modelName),_RolesControllers.index)
        .post(
                permissionsMiddleware(modelName),
                createRuleValidationReqSchema,
                handleValidateErrorReq,
                _RolesControllers.checkRoleNameIsUnique,
                _RolesControllers.store
        );

roleRouter.route('/:id')
        .get(permissionsMiddleware(modelName),_RolesControllers.show)
        .patch(
                permissionsMiddleware(modelName),
                updateRuleValidationReqSchema,
                handleValidateErrorReq,
                _RolesControllers.checkRoleNameIsUnique,
                _RolesControllers.update
        )
        .delete(
                permissionsMiddleware(modelName),
                _RolesControllers.destroy
        );
