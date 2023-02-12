import {Schema, model, Document} from 'mongoose';

const informeSchema= new Schema({
    nombreProyecto: String,
    fecha: String,
    tipo_informe:String,
    estadoAprobacion : Number,
    horas: Number,
    archivoPath: String,
    idTutorAcademico: String,
    idConvenio: String,
    idEstudiante: String
});

interface iInforme extends Document{
    nombreProyecto: string;
    fecha: string;
    tipo_informe: string;
    estadoAprobacion : number;
    horas: number;
    archivoPath: string;
    idTutorAcademico: String;
    idConvenio: String;
    idEstudiante: string
}

export default model<iInforme>('Informe', informeSchema)