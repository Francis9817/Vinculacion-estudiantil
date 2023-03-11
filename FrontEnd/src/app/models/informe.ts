export interface Informe {
    id?: string;
    nombreProyecto: string;
    tipo_informe: string;
    tutorAcademico: string;
    fecha: string;
    estadoAprobacion: number;
    progresos: number;
    archivoPath: string;
    idConvenio: string;
    idEstudiante: string;
    idTutor: string;
}
