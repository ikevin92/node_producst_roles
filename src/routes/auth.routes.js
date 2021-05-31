import { Router } from 'express';
const router = Router();

// importamos los controllers
import * as authCtrl from '../controllers/auth.controller';
import { verifySignup } from '../middlewares';

router.post( '/signup', [ verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted ], authCtrl.signUp );

router.post( '/signin', authCtrl.signIn );

export default router;