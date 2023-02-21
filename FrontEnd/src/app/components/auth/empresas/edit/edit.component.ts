import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmpresaService } from 'src/app/service/empresa.service';
import { Institucion } from 'src/app/models/instituciones';
import { ActivatedRoute, Router } from '@angular/router';
declare let alertify: any;


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  convenios: FormGroup;
  institucion: Institucion;
  id: string;
  file: File;
  fileSelected: string | ArrayBuffer;


  constructor(private empresa: FormBuilder, private empresaService: EmpresaService,
              private activeRouter: ActivatedRoute, private router: Router) {
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
    this.activeRouter.params.subscribe(param => {
      this.id = param.id;
      this.empresaService.getInstitucion(this.id)
        .subscribe( res => {
          this.institucion = res;
        },
        err => {
          console.log(err);
        });
    });
  }

  archivoSubir(event) {
    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.file = <File> event.target.files[0];
    }
  }

  update(representante: HTMLInputElement,nombre: HTMLInputElement, 
    direccion:HTMLInputElement, celular:HTMLInputElement, fecha_inicio:HTMLInputElement,
    fecha_fin:HTMLInputElement, correo_institucion:HTMLInputElement) {
    this.blockUI.start('Enviado Empresa');
    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);
    this.empresaService.updateVinculacion(this.id,  representante.value, nombre.value,  direccion.value, celular.value, fecha_inicio.value, fecha_fin.value, correo_institucion.value, this.file)
      .subscribe( res => {
        alertify.success('Empresa Actualizada Correctamente');
        this.convenios.reset();
        this.quitarValidar();
        this.router.navigate(['/auth/detalle']);
      }, err => {
        alertify.error('Error al Actualizar la Empresa');
      });
  }

  quitarValidar() {
    const forms = document.getElementsByClassName('needs-validation');
    // tslint:disable-next-line:only-arrow-functions
    Array.prototype.filter.call(forms, function(form) {
      form.classList.remove('was-validated');
    }, false);
  }

}
