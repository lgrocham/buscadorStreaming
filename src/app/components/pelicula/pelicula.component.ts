import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JustwatchService } from 'src/app/services/justwatch.service';
import { Pelicula } from 'src/app/modelos/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html'
})
export class PeliculaComponent {
  //pelicula: Pelicula = new Pelicula();
  pelicula: Pelicula[] = [];
  ofertas: any[] = [];
  src: string;
  paises: any[] = [];


  constructor(private router: ActivatedRoute,
              private justWatch: JustwatchService) { 

   this.justWatch.getPaises()
    .subscribe( (data: any) => {
    this.paises = data;
    this.router.params.subscribe( params => {
      this.getPelicula( params['id']) ;
 });
  });




}

  ngOnInit(){

  }

  getPelicula(id: string){
    for (let i = 0; i < this.paises.length; i++)
    {
      this.justWatch.getPelicula(id, this.paises[i].full_locale)
      .subscribe((data: any) => {
        this.pelicula[i] = data;
        if (this.pelicula[i]?.offers?.length > 0)
        {
          this.pelicula[i].offers = this.pelicula[i].offers.filter(a => a.monetization_type === 'flatrate' || a.monetization_type === 'ads');
          console.log(this.paises[i].country_names.es);
          this.pelicula[i].offers = this.pelicula[i].offers.filter((thing, i, arr) => arr.findIndex(t => t.provider_id === thing.provider_id) === i);
          this.pelicula[i].pais = this.paises[i].country_names.es;
          this.pelicula[i].bandera = "https://www.countryflags.io/" + this.paises[i].iso_3166_2 + "/shiny/32.png";

          this.justWatch.getProveedores(this.paises[i].full_locale)
            .subscribe((pro: any) => {
              this.pelicula[i].offers.map((obj) => {
                if (pro.find(x => x.id === obj.provider_id))
                {
                  this.src = pro.find(x => x.id === obj.provider_id).icon_url;      
                    this.src = this.src.replace('{profile}', 's50');
                    obj.linkPro = 'https://images.justwatch.com' + this.src;
                }
                else
                {
                  obj.linkPro = 'assets/img/noimage.png'
                }
               
                return obj;
                });
            });
        }


          console.log(this.pelicula[i].offers);
      });
    }
    

  }


}
