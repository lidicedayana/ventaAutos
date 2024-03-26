import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagRegistrarCliente',
  templateUrl: './pagRegistrarCliente.component.html',
  styleUrls: ['./pagRegistrarCliente.component.css']
})
export class PagRegistrarClienteComponent implements OnInit {
  formulario: FormGroup;
  
  constructor(private _router: Router,
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService) {
      this.formulario= this.formBuilder.group({
        "codigo": ['', [Validators.required]],
        "nombre": ['', [Validators.required]],
        "apellido": ['', [Validators.required]],
        "password": ['', [Validators.required]],
        "email": [''],
        "telefono": [''],
        "quiereContacto": [false]
       
      })
     }

  ngOnInit(): void {
  }

  goInicio(): void {
    this._router.navigate(['/home']);
    
  }

  registrar(){
    if(this.formulario.valid){
      this.vehiculoService.insertarCliente({...this.formulario.value}).subscribe(
        respuesta =>{
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Cliente Registrado con Exito",
              icon: "success"

            }).then(res =>{
              this._router.navigate(['/vehiculos']);
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo registrar el Cliente: "+respuesta.mensaje,
              icon: "error"
            });
          }
        }
      );
    }else{
      Swal.fire({
      title: "Mensaje",
      text: "Faltan llenar campos?",
      icon: "error"
    });

   }
  }

}
