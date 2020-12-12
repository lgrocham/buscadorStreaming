import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JustwatchService {

  src: string;
  cors: string

  constructor(private http: HttpClient) { 
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    {
      this.cors = "";
    }
    else
    {
      this.cors = "https://cors-anywhere.herokuapp.com/";
    }
  }

  getPaises()
  {
    return this.http.get(this.cors + 'https://apis.justwatch.com/content/locales/state')
    .pipe(map( (data: any)  => data.sort(function(a, b) {
      if (a.country_names.es > b.country_names.es) {
        return 1;
      }
      if (a.country_names.es < b.country_names.es) {
        return -1;
      }
      return 0;
    })
    ));
  }

  getPeliculas(termino: string, codigoPais: string)
  {
    return this.http.get(this.cors + `https://apis.justwatch.com/content/titles/${codigoPais}/popular?body=%7B%22page_size%22:9,%22page%22:1,%22query%22:%22 ${termino} %22,%22content_types%22:[%22show%22,%22movie%22]%7D`)
    .pipe(map(data => data["items"].map((obj) => {
      this.src = obj.poster;
      if (this.src != undefined)
      {
        this.src = this.src.replace('{profile}', 's166');
        obj.linkPoster = 'https://images.justwatch.com' + this.src;
      }
      return obj;
      })
    ));
  }

  getPelicula(id: string, pais: string)
  {
    return this.http.get(this.cors + `https://apis.justwatch.com/content/titles/movie/${id}/locale/${pais}`);
  }

  getProveedores(pais: string)
  {
    return this.http.get(this.cors + `https://apis.justwatch.com/content/providers/locale/${pais}`);
  }
    //.pipe(map((data: any) => data.map((obj) => {
      
      // this.src = obj.poster;
      // this.src = this.src.replace('{profile}', 's166');
      // obj.linkPoster = 'https://images.justwatch.com' + this.src;
  //     obj.offers
  //     obj.provider_id,
  //     obj.monetization_type
  //     return obj;
  //     })
  //   ));
  // }
  // }

}
