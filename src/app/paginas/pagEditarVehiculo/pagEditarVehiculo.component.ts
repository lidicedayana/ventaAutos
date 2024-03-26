import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { validadorCodigo } from '../../validaciones/vehiculoValidaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagEditarVehiculo',
  templateUrl: './pagEditarVehiculo.component.html',
  styleUrls: ['./pagEditarVehiculo.component.css']
})
export class PagEditarVehiculoComponent implements OnInit {

  vehiculo?: Vehiculo;
  formulario: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      "codigo": ['', [Validators.required, validadorCodigo()]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "color": ['', [Validators.required]],
      "anio": ['', [Validators.required]],
      "kilometraje": ['', [Validators.required]],
      "precio": [],
      "calificacion": ['', [Validators.required]],
      "foto": ['']
    });
    this.formulario.controls['codigo'].disable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data => {
        if (data.codigo == '1') {
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['color'].setValue(this.vehiculo?.color);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
          this.formulario.controls['foto'].setValue(this.vehiculo?.foto);
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


  guardar() {
    if (this.formulario.valid) {
      this.vehiculoService.actualizarVehiculo({ ...this.formulario.value }, this.formulario.controls['codigo'].value).subscribe(data => {
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
