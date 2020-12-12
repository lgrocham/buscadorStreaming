import { Component, OnInit } from '@angular/core';
import { JustwatchService } from 'src/app/services/justwatch.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  paises: any[] = [];
  peliculas: any[] = [];
  src: string;
  codigoPais: string = 'en_US';

  constructor(private justWatch: JustwatchService,
              private router: Router) {

    this.justWatch.getPaises()
    .subscribe( (data: any) => {
      this.paises = data;
    });
  }

  ngOnInit(){

  }

  buscar(termino: string)
  {
    this.justWatch.getPeliculas(termino, this.codigoPais)
    .subscribe( (data: any) => {
      this.peliculas = data;
    });
  }

  verPelicula(item: any) {
    let peliculaId;
    peliculaId = item.id;
    this.router.navigate(['/pelicula', peliculaId]);
    //this.router.navigate([ '/pelicula', peliculaId]);
  }

}
