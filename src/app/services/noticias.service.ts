import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage=0;
  categoriaActual='';
  categoriaPage=0;

  constructor(
    private http: HttpClient,
    
  )
  {

  }

  private ejecutarQuery<T>(query: string){
    query=apiUrl+query;
    return this.http.get<T>(query,{headers});
  }

  getTopHeadLines(){
    this.headlinesPage++;
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/everything?q=ecuador&apiKey=59385855f0304deeae76500d7764e5bd`);

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headlinesPage}`);
  }

  getTopHeadLinesCategoria(categoria:string){
    if(this.categoriaActual===categoria){
      this.categoriaPage++;
    }
    else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/everything?q=ecuador&category=business&apiKey=59385855f0304deeae76500d7764e5bd`);

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);

  }

}
