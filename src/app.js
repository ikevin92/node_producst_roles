import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

const app = express();

// se usa para nombrar la variable del package
app.set( 'pkg', pkg );

//middelwares
app.use( morgan( 'dev' ) );

app.get( '/', ( req, res ) => {
    res.json( {
        author: app.get( 'pkg' ).author,
        description: app.get( 'pkg' ).description,
        version: app.get( 'pkg' ).version
    } );
} );


export default app;