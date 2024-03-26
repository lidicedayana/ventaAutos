import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import Swal from 'sweetalert2';
import { Console } from 'node:console';
import { validadorCodigo } from '../../validaciones/vehiculoValidaciones';

@Component({
  selector: 'app-pagRegistroVehiculo',
  templateUrl: './pagRegistroVehiculo.component.html',
  styleUrls: ['./pagRegistroVehiculo.component.css']
})
export class PagRegistroVehiculoComponent implements OnInit {

  formulario: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService
    // private activedRoute: ActivatedRoute
    ) {
      this.formulario= this.formBuilder.group({
        "codigo": ['', [Validators.required, validadorCodigo()]],
        "marca": ['', [Validators.required]],
        "modelo": ['', [Validators.required]],
        "color": ['', [Validators.required]],
        "anio": ['', [Validators.required]],
        "kilometraje": ['', [Validators.required]],
        "precio": [],
        "calificacion": ['', [Validators.required]],
        "foto": ['']
      }
      // ,{
      //   validators: validadorCodigoComparativo()
      // }
      );
     }
  ngOnInit() {
    // this.formulario.controls['codigo'].disable();
    // this.activedRoute.params.subscribe(params =>{
    //   let codigo = params
    // })
  }

  guardar(){
 
    if(this.formulario.valid){
      this.vehiculoService.insertVehiculos({...this.formulario.value}).subscribe(
        respuesta =>{
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Vehiculo Registrado con Exito",
              icon: "success"

            }).then(res =>{
              this.formulario.reset();
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo registrar el vehiculo: "+respuesta.mensaje,
              icon: "error"
            });
          }
        }
      )
    }else{
      Swal.fire({
      title: "Mensaje",
      text: "Faltan llenar campos?",
      icon: "error"
    });

   }
  }

   
}


// export function validadorCodigoComparativo() {
//   return (formulario: FormGroup): ValidationErrors | null => {
//     let valor1 = formulario.controls['codigo'].value;
//     let valor2 = formulario.controls['codigo_confirms'].value;

//     if (valor1 === valor2) {
//       return null;
//     }
//     return { 'codigoComparativo': true }; 
//   };
// }