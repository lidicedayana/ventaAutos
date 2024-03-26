import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagListaVehiculos',
  templateUrl: './pagListaVehiculos.component.html',
  styleUrls: ['./pagListaVehiculos.component.css']
})
export class PagListaVehiculosComponent implements OnInit {

  mostrarImagen = false;
  public filtro: string = "";

  // private _filtro:string="";
  public rows: number = 10;
  public page: number = 1;
  public pages: number = 0;
  // get filtro(){
  //   return this._filtro;
  // }

  // set filtro(data:string){
  //   this._filtro=data;
  //   this.consultarVehiculos();
  // }
  @Input() valor: string = "";
  listaVehiculos: Array<any> = [];
  constructor(
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.consultarVehiculos();
  }

  mostrar() {
    this.mostrarImagen = !this.mostrarImagen;
  }

  consultarVehiculos() {
    this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe(respuesta => {
      if(respuesta.codigo=='1'){
        this.listaVehiculos = respuesta.data;
        this.pages = respuesta.pages;
        this.paginar(respuesta.pages);

      }
      
    });
  }
  recepcion(dato: number) {
    console.log('Dato:', dato);
  }

  eliminar(codigo: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.eliminarVehiculo(codigo).subscribe(respuesta => {
          if (respuesta.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: "Vehiculo eliminado con Exito",
              icon: "success"
            }).then(res => {
              this.consultarVehiculos();
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el vehiculo",
              icon: "error"
            });
          }
        });
      }
    })
  }

  siguiente() {
    if (this.page < this.pages) {
      this.page++;
      this.consultarVehiculos();
    }
  }

  atras() {
    if (this.page > 1) {
      this.page--;
      this.consultarVehiculos();
    }
  }
  cambiarPagina(pagina: number) {
    this.page = pagina;
    this.consultarVehiculos();

  }
  listaPaginas: Array<number>=[];
  paginar(pages: number) {
    this.listaPaginas = [];
    for (let i = 1; i <= pages; i++) {
      this.listaPaginas.push(i);
    }

  }


}
