import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../utilitarios/modelos/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-padEditarCliente',
  templateUrl: './padEditarCliente.component.html',
  styleUrls: ['./padEditarCliente.component.css']
})
export class PadEditarClienteComponent implements OnInit {

  cliente?: Cliente;
  formulario: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private _router: Router,
    private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      "id": ['', [Validators.required]],
        "nombre": ['', [Validators.required]],
        "apellido": ['', [Validators.required]],
        "password": ['', [Validators.required]],
        "email": [''],
        "telefono": [''],
        "quiereContacto": [false]
    });
    this.formulario.controls['id'].disable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.vehiculoService.getCliente(params['id']).subscribe(data => {
        if (data.codigo == '1') {
          this.cliente = data.data;
          this.formulario.controls['id'].setValue(this.cliente?.id);
          this.formulario.controls['nombre'].setValue(this.cliente?.nombre);
          this.formulario.controls['apellido'].setValue(this.cliente?.apellido);
          this.formulario.controls['password'].setValue(this.cliente?.password);
          this.formulario.controls['email'].setValue(this.cliente?.email);
          this.formulario.controls['telefono'].setValue(this.cliente?.telefono);
          this.formulario.controls['quiereContacto'].setValue(this.cliente?.quiereContacto);
        } else {
          Swal.fire({
            title: "Mensaje de alerta",
            text: "No se puede cargar la información",
            icon: "error"
          });
        }

      });
    });
  }

  goAtras(): void {
    this._router.navigate(['/ConsultaClientes']);
    
  }

  guardar() {
    if (this.formulario.valid) {
      this.vehiculoService.actualizarCliente({ ...this.formulario.value }, this.formulario.controls['id'].value).subscribe(data => {
        if (data.codigo == '1') {
          Swal.fire({
            title: "Mensaje",
            text: "Vehiculo Actualizado con Exito",
            icon: "success"
          }).then(res => {
            this.formulario.reset();
          });
        }else{
          Swal.fire({
            title: "Mensaje",
            text: "No se pudo actualizar: "+data.mensaje,
            icon: "info"
          });
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Faltan llenar campos",
        icon: "error"
      });

    }
  }

}
