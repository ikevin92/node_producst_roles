import { Router } from 'express';
const router = Router();


router.get( '/', ( req, res ) => res.json( 'obtener productos' ) );


export default router;