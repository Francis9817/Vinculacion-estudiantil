import {Schema, model, Document} from 'mongoose';

const institucionSchema= new Schema({
    nombre: String,
    direccion: String,
    celular : String,
    representante: String,
    fecha_inicio: String,
    fecha_fin: String,
    correo_institucion: String,
    archivoPath: String

});

interface iInstitucion extends Document{
    nombre: String,
    direccion: String,
    celular : String,
    representante: String
    fecha_inicio: String,
    fecha_fin: String,
    correo_institucion: String,
    archivoPath: string
}

export default model<iInstitucion>('Institucion', institucionSchema)