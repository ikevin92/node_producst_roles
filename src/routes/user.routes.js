import { Router } from 'express';
const router = Router();

// controladores
import * as userCtrl from '../controllers/user.controller';

// midleware
import { authJwt, verifySignup } from '../middlewares';

router.post( '/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted,
    verifySignup.checkDuplicateUsernameOrEmail
], userCtrl.createUser );
router.get( '/', [
    authJwt.verifyToken,
    authJwt.isAdmin
], userCtrl.createUser );
router.post( '/', [
    authJwt.verifyToken,
    authJwt.isAdmin
], userCtrl.createUser );

export default router;