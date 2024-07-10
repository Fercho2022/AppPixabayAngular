import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent {
  termino: string = '';
  suscriptiontermino: Subscription;
  listImagenes:any[]=[];
  loading:boolean=false;
  imagenesPorPagina:number=30;
  paginaActual:number=1;
  calcularTotalPaginas:number=0;
  suscriptionEliminar: Subscription;
  paginasig:boolean=true;





  constructor(private _imagenService: ImagenService) {

    this.suscriptionEliminar=this._imagenService.getImg().subscribe(data=>{
      if(data){
        this.listImagenes=[];

      }

    })



    this.suscriptiontermino = this._imagenService.recibirTerminoBusqueda().subscribe((data) => {
        this.termino = data;
        this.paginaActual=1;
        this.paginasig=false;
        this.obtenerImagenes();
        setTimeout(() => {
          this.paginasig=true;
        }, 1500);
      });
  }

  paginaAnteriorClass(){

    if (this.paginaActual===1){
      return false;
    }else{
      return true;
    }
  }

  paginaPosteriorClass(){
    if (this.paginaActual===this.calcularTotalPaginas){
      return false;
    }else{
      return true;
    }
  }

  bajarPagina(){
    if (this.paginaActual>1){
      this.paginaActual--;

      this.paginasig=false;
      this.obtenerImagenes();
      setTimeout(() => {

        this.paginasig=true;
      }, 2000);


      return;
    }



  }

  subirPagina(){
    if(this.paginaActual<this.calcularTotalPaginas){
      this.paginaActual++;
      console.log(this.paginaActual);
      this.paginasig=false;
      this.obtenerImagenes();
      setTimeout(() => {

        this.paginasig=true;
      }, 2000);

      return;

    }


  }

  obtenerImagenes() {
    const PAGINACION={
      termino: this.termino,
      pagina: this.paginaActual,
      imgPorPagina: this.imagenesPorPagina
    }

    this._imagenService.getImagenes(PAGINACION).subscribe(data=>{
      this.loading=true;

      console.log(data);

      if(data.hits.length===0){
          this._imagenService.setError('Opsss.....No encontramos ningún resultado');
          this.loading=false;
          this.listImagenes=[];
          return;
      }
      this.calcularTotalPaginas=Math.ceil(data.totalHits/this.imagenesPorPagina);
      setTimeout(() => {
        this.loading=false;
        this.listImagenes=data.hits;
      }, 1000);


  }, error=>{
    this._imagenService.setError('Opsss.....Ocurrió un error');
    this.loading=false;

  })
}

}
