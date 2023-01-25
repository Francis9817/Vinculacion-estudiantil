import {connect} from 'mongoose'

 export async function startConnection(){
    await connect('mongodb://0.0.0.0:27017/vinculacion-db', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('Database is connected')
}
