// importamos el modelo
import User from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import config from '../config';


// registrar
export const signUp = async ( req, res ) => {

    const { username, email, password, roles } = req.body;

    // comprobar usuario
    // const userFound = User.find( ( { email } ) );

    // if ( userFound ) {

    // }

    const newUser = new User( {
        username,
        email,
        password: await User.encryptPassword( password ),

    } );

    // validacion de rol
    if ( roles ) {
        const foundRoles = await Role.find( { name: { $in: roles } } );
        // guarda los roles 
        newUser.roles = foundRoles.map( role => role._id );
    } else {
        const role = await Role.findOne( { name: 'user' } );
        newUser.roles = [ role._id ];
    }

    // guardar en bd
    const saveUser = await newUser.save();

    console.log( saveUser );

    // aplicamos el token
    const token = jwt.sign(
        { id: saveUser._id },
        config.SECRET,
        {
            expiresIn: 86400, // expira en 24h
        } );

    // se retorna el token
    res.json( { token } );
};

// loguear
export const signIn = async ( req, res ) => {

    const { email, password } = req.body;

    const userFound = await User.findOne( { email } ).populate( 'roles' );

    console.log( userFound );

    if ( !userFound ) return res.status( 400 ).json( { message: "user no found" } );

    // comparacion de contraseña
    const matchPassword = await User.comparePassword( req.body.password, userFound.password );

    if ( !matchPassword ) return res.status( 401 ).json( { token: null, message: 'Invalid Password' } );

    // aplicamos el token
    const token = jwt.sign(
        { id: userFound._id },
        config.SECRET,
        {
            expiresIn: 86400, // expira en 24h
        } );

    res.json( { token } );
};
