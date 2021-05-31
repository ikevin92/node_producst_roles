import { Router } from 'express';
const router = Router();

// importamos los controllers
import * as productsCtrl from '../controllers/products.controller';

// importamos los middlwares
import { authJwt } from '../middlewares';


router.post( '/', [ authJwt.verifyToken, authJwt.isModerator ], productsCtrl.createProduct );
router.get( '/', productsCtrl.getProducts );
router.get( '/:productId', productsCtrl.getProductById );
router.put( '/:productId', [ authJwt.verifyToken, authJwt.isAdmin ], productsCtrl.updateProductById );
router.delete( '/:productId', [ authJwt.verifyToken, authJwt.isAdmin ], productsCtrl.deleteProductById );


export default router;