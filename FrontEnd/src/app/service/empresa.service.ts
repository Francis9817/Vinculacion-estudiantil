import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Informe } from '../models/informe';
import { Institucion } from '../models/instituciones';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  urlApi = 'http://localhost:4000/api';

  constructor( private http: HttpClient) { }


  crearConvenio(
    representante: string,
    nombre: string,
    direccion: string,
    celular: string,
    fecha_inicio: string,
    fecha_fin: string,
    correo_institucion: string,
    file: File) {
    const fd = new FormData();
    fd.append('representante', representante);
    fd.append('nombre', nombre);
    fd.append('direccion', direccion);
    fd.append('celular', celular);
    fd.append('fecha_inicio', fecha_inicio);
    fd.append('fecha_fin', fecha_fin);
    fd.append('correo_institucion', correo_institucion);
    fd.append('file', file);
    return this.http.post(`${this.urlApi}/obtenerConvenios`, fd);
  }

/*   crearEmpresa( newEmpresa: Institucion) {
    return this.http.post(`${this.urlApi}/obtenerConvenios`, newEmpresa);
  } */

  // Intituciones
  getInstituciones() {
    return this.http.get<Institucion[]>(`${this.urlApi}/obtenerConvenios`);
  }

  getInstitucion(id: string) {
    return this.http.get<Institucion>(`${this.urlApi}/convenio/${id}`);
  }

  deleteInstitucion(id: string) {
    return this.http.delete(`${this.urlApi}/convenio/${id}`);
  }

  updateVinculacion(id: string,
    representante: string,
    nombre: string,
    direccion: string,
    celular: string,
    fecha_inicio: string,
    fecha_fin: string,
    correo_institucion: string,
    file: File
  ){
    const fd = new FormData();
    fd.append('representante', representante);
    fd.append('nombre', nombre);
    fd.append('direccion', direccion);
    fd.append('celular', celular);
    fd.append('fecha_inicio', fecha_inicio);
    fd.append('fecha_fin', fecha_fin);
    fd.append('correo_institucion', correo_institucion);
    fd.append('file', file);
    return this.http.put(`${this.urlApi}/convenio/${id}`, fd);
  }

  updateInstitucion( id: string,  updateEmpresa: Institucion) {
    return this.http.put(`${this.urlApi}/convenio/${id}`, updateEmpresa);
  }

}
