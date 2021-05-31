import mongoose from 'mongoose';

const url = "mongodb+srv://admin:admin@cluster0.jzgix.mongodb.net/companydb?retryWrites=true&w=majority";


const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect( url, connectionParams ).
    then( ( db ) => {

        console.log( 'Connected to database '  );
    } )
    .catch( ( err ) => {
        console.error( `Error connecting to the database. \n${ err }` );
    } );