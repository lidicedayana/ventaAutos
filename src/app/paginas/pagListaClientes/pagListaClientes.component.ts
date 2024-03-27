import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagListaClientes',
  templateUrl: './pagListaClientes.component.html',
  styleUrls: ['./pagListaClientes.component.css']
})
export class PagListaClientesComponent implements OnInit {
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
  listaClientes: Array<any> = [];
  constructor(
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.consultarClientes();
  }


  consultarClientes() {
    this.vehiculoService.getClientes(this.filtro, this.rows, this.page).subscribe(respuesta => {
      if(respuesta.codigo=='1'){
        this.listaClientes = respuesta.data;
        this.pages = respuesta.pages;
        this.paginar(respuesta.pages);

      }
      
    });
  }
  recepcion(dato: number) {
    console.log('Dato:', dato);
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.eliminarCliente(id).subscribe(respuesta => {
          if (respuesta.codigo == '1') {
            Swal.fire({
              title: "Mensaje",
              text: "Cliente eliminado con Exito",
              icon: "success"
            }).then(res => {
              this.consultarClientes();
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el cliente",
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
      this.consultarClientes();
    }
  }

  atras() {
    if (this.page > 1) {
      this.page--;
      this.consultarClientes();
    }
  }
  cambiarPagina(pagina: number) {
    this.page = pagina;
    this.consultarClientes();

  }
  listaPaginas: Array<number>=[];
  paginar(totalPaginas: number) {
    this.listaPaginas = [];

    const rango = 1; // Mostrar dos páginas antes y dos después de la página actual
    let inicio = Math.max(1, this.page - rango);
    let fin = Math.min(totalPaginas, this.page + rango);

    // Ajustar el rango si está demasiado cerca del inicio o del final
    if (this.page <= rango) {
      fin = Math.min(2 * rango + 1, totalPaginas);
    } else if (totalPaginas - this.page < rango) {
      inicio = Math.max(totalPaginas - 2 * rango, 1);
    }

    for (let i = inicio; i <= fin; i++) {
      this.listaPaginas.push(i);
    }
  }


}
