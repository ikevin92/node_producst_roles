import config from '../config';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async ( req, res, next ) => {


    // extrae token del header
    const token = req.headers[ "x-access-token" ];
    console.log( { token } );

    // valida si existe el token
    if ( !token ) return res.status( 403 ).json( { message: "No token provided" } );

    try {
        // si existe el token se verifica
        const decoded = jwt.verify( token, config.SECRET );
        req.userId = decoded.id;

        // validacion si existe el usuario
        const { userId } = req;
        const user = await User.findById( userId, { password: 0 } );
        if ( !user ) return res.status( 404 ).json( { message: 'no user found' } );

        // si todo es correcto el next da el paso
        next();
    } catch ( error ) {
        return res.status( 401 ).json( { message: 'Unauthorized' } );
    }

};


// validando los perfiles
export const isModerator = async ( req, res, next ) => {

    // console.log( 'moderador' );

    const user = await User.findById( req.userId );
    const roles = await Role.find( { _id: { $in: user.roles } } );

    console.log( { roles } );

    // comprueba si es moderator role
    if ( ( roles.filter( rol => rol.name === 'moderator' ) ).length > 0 ) return next();
    // next();

    return res.status( 403 ).json( { message: 'Requiree Moderator role' } );


};

export const isAdmin = async ( req, res, next ) => {

    const user = await User.findById( req.userId );
    const roles = await Role.find( { _id: { $in: user.roles } } );

    console.log( { roles } );

    // comprueba si es admin role
    if ( ( roles.filter( rol => rol.name === 'admin' ) ).length > 0 ) return next();
    // next();

    return res.status( 403 ).json( { message: 'Requiree Admin role' } );
};
