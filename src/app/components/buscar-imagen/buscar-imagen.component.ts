import { Component } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {


  nombreImagen:string;
  listImagenes=false;

  constructor(private _buscarImagenService:ImagenService){

    this.nombreImagen='';
  }
  buscarImagenes(){
      if (this.nombreImagen===''){
        this.listImagenes=true;
        this._buscarImagenService.setError('Agrega un texto de busqueda')

        this._buscarImagenService.setImagenes(this.listImagenes);
        return;

      }
        this._buscarImagenService.enviarTerminoBusqueda(this.nombreImagen);


  }

}
