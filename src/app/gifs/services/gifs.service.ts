import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string   = 'oBrZiFZwRbCB6WUia691xgHeOCPqj26l';
  private servicioUrl : string   = 'https://api.giphy.com/v1/gifs'
  private _historial  : string[] = [];


  public resultados: Gif[] = [];
  // TOD:CAMBIAR ANY POR TIPO CORRESPONDIENTE

  get historial() {
    return [...this._historial];
  }

  constructor ( private http: HttpClient){
        this._historial = JSON.parse(localStorage.getItem('historial') ! )|| [] ;
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [] ;
  }

  async buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial = this._historial.splice(0, 10);
      this._historial.unshift(query);

      localStorage.setItem('historial', JSON.stringify( this._historial ));

    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit',10)
        .set('q',query);

    console.log(params);

    this.http.get<SearchGifsResponse> (`${this.servicioUrl}/search`, { params } )
      .subscribe( (resp: any ) =>{
        console.log( resp );
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      });

  }

}
