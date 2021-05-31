// importamos el modelo
import Product from '../models/Product';

export const createProduct = async ( req, res ) => {

    const { body } = req;

    // creamos un nuevo objeto y le pasamos el body
    const newProduct = new Product( body );

    // guardar en la bd
    const productSave = await newProduct.save();

    // enviar respuesta 
    res.status( 200 ).json( productSave );

};

export const getProducts = async ( req, res ) => {

    const products = await Product.find();

    res.json( products );


};

export const getProductById = async ( req, res ) => {

    const { productId } = req.params;

    const product = await Product.findById( productId );

    res.status( 200 ).json( product );

};

export const updateProductById = async ( req, res ) => {

    const { productId } = req.params;
    const { body } = req;

    const updateProduct = await Product.findByIdAndUpdate( productId, body,
        {
            new: true
        } );

    res.status( 200 ).json( updateProduct );

};
export const deleteProductById = async ( req, res ) => {

    const { productId } = req.params;


    const deleteProduct = await Product.findByIdAndDelete( productId );

    // console.log(producto)

    res.status( 200 ).json( 'Producto eliminado' );

};