import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagVehiculos',
  templateUrl: './pagVehiculos.component.html',
  styleUrls: ['./pagVehiculos.component.css']
})
export class PagVehiculosComponent implements OnInit {

  vehiculo?: Vehiculo;
  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data =>{
        this.vehiculo = data.data;
      })
    });
  }

  imprimir(data: any){
    console.log("Calificación: ", data)
  }

}
