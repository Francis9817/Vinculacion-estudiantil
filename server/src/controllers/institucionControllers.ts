import { Request, Response } from 'express'
import Institucion from '../models/Instituciones';
import path from 'path'
import fs from 'fs-extra'

/* import { Request, Response } from 'express'
import Informe from '../models/informeAcademico';
const User = require('../libs/user');
import path from 'path'
import fs from 'fs-extra'
import Instituciones from '../models/Instituciones'; */

export async function getInstituciones(req: Request, res: Response): Promise<Response>{
    const institucion = await Institucion.find();
    return res.json(institucion)
}

export async function getInstitucion(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const vinculacion = await Institucion.findById(id);
    return res.json(vinculacion)
}

export async function crearInstitucion(req: Request, res: Response): Promise<Response> {
    const { nombre, direccion, celular, representante, fecha_inicio, fecha_fin, correo_institucion } = req.body;
    const newInstitucion = { 
        nombre,  
        representante,
        direccion,
        celular, 
        archivoPath: req.file.path,
        fecha_inicio,
        fecha_fin,
        correo_institucion,
    };
    const institucion = new Institucion(newInstitucion);
    await institucion.save();
    const vinculacion = await Institucion.find();
    return res.json({
        message: 'Institucion Saved Successfully',
        vinculacion
    });
};

export async function updateInstitucion(req: Request, res: Response): Promise<Response>{
    const { nombre, direccion, celular, representante, fecha_inicio, fecha_fin, correo_institucion } = req.body;
    const institucion = await Institucion.findById(req.params.id);
    if (institucion) {
        await fs.unlink(path.resolve(institucion.archivoPath))
    }
    await Institucion.findByIdAndUpdate(req.params.id, { 
        nombre, 
        direccion,
        celular, 
        representante,
        fecha_inicio,
        fecha_fin,
        correo_institucion,
        archivoPath: req.file.path
    }, {new:true});
    const vinculacion = await Institucion.find();
    return res.json({
        message: 'Institucion Updated',
        vinculacion
    })
}

export async function deleteInstitucion(req: Request, res: Response): Promise<Response>{
    const institucion = await Institucion.findByIdAndRemove(req.params.id);
    const vinculacion = await Institucion.find();
    return res.json({
        message: 'Delete finished',
        vinculacion
    })
}

