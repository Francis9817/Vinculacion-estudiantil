import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Institucion } from 'src/app/models/instituciones';
import { DatePipe } from '@angular/common';

declare let alertify: any;


@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  convenios: FormGroup;
  file: File;
  fileSelected: string | ArrayBuffer;
  ahora: any;
  deshabilitar: any;
  fingreso: string;

  constructor(private empresa: FormBuilder, private empresaService: EmpresaService) {
    this.convenios = this.empresa.group({
      representante: new FormControl('', [Validators.required, Validators.minLength(5)]),
      empresa: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      fecha_inicio: new FormControl('', [Validators.required]),
      fecha_fin: new FormControl('', [Validators.required]),
      correo_institucion: new FormControl('', [Validators.required]),
      archivoPath: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit() {

    const datePite = new DatePipe('en-Us')
    this.ahora = datePite.transform(new Date(), 'yyyy-MM-dd')
  }

  cambioFecha() {
		this.deshabilitar = this.fingreso
	}



  archivoSubir(event) {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.file = <File>event.target.files[0];
    }
  }

  enviar(representante: HTMLInputElement, nombre: HTMLInputElement,
    direccion: HTMLInputElement, celular: HTMLInputElement, fecha_inicio: HTMLInputElement,
    fecha_fin: HTMLInputElement, correo_institucion: HTMLInputElement) {
    this.blockUI.start('Enviado Empresa');
    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);

    /* 
         representante: string,
        nombre: string,
        direccion: string,
        celular: string,
        fecha_inicio: string,
        fecha_fin: string,
        correo_institucion: string,
        file: File */
    this.empresaService.crearConvenio(representante.value, nombre.value, direccion.value, celular.value, fecha_inicio.value, fecha_fin.value, correo_institucion.value, this.file)
      .subscribe(res => {
        alertify.success('Empresa Ingresada Correctamente');
        this.convenios.reset();
        this.quitarValidar();
      }, err => {
        alertify.error('Error al Ingresar la Empresa');
      });
  }

  quitarValidar() {
    const forms = document.getElementsByClassName('needs-validation');
    // tslint:disable-next-line:only-arrow-functions
    Array.prototype.filter.call(forms, function (form) {
      form.classList.remove('was-validated');
    }, false);
  }


}
