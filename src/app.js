import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

// importamoslas libs
import { createRoles } from './libs/initialSetup';

//importacion de rutas
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';



// inicializacion de express 
const app = express();
// creacion de roles
createRoles();

// se usa para nombrar la variable del package
app.set( 'pkg', pkg );


//middelwares
app.use( morgan( 'dev' ) );
app.use( express.json() ); // para que entienda el formato json

// ruta principal
app.get( '/', ( req, res ) => {
    res.json( {
        author: app.get( 'pkg' ).author,
        description: app.get( 'pkg' ).description,
        version: app.get( 'pkg' ).version
    } );
} );

// routes
app.use( '/api/products', productsRoutes );
app.use( '/api/auth', authRoutes );
app.use( '/api/users', userRoutes );


export default app;